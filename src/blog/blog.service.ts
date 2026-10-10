import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { slugify } from '../common/helpers/slug.helper';
import {
  serializeBlogPost,
  serializeBlogPostDetail,
} from '../common/serializers/blog.serializer';

type BlogInput = {
  id?: string;
  slug: string;
  title: string;
  titleAccent?: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  author: string;
  readingTime: string;
  date: string;
  dateISO: string;
  image: string;
  imageAlt: string;
  article?: unknown;
  status?: string;
};

import { MediaRelationService } from '../media/media-relation.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly repo: Repository<BlogPost>,
    private readonly mediaRelationService: MediaRelationService,
  ) {}

  async findAll(includeDrafts = false) {
    const posts = await this.repo.find({
      order: { sortOrder: 'ASC', dateISO: 'DESC' },
    });
    const filtered = includeDrafts
      ? posts
      : posts.filter((p) => p.status !== 'draft');
    return filtered.map(serializeBlogPost);
  }

  async findAllForCms() {
    const posts = await this.repo.find({
      order: { sortOrder: 'ASC', dateISO: 'DESC' },
    });
    return posts.map(serializeBlogPost);
  }

  async findBySlug(slug: string) {
    const post = await this.repo.findOne({ where: { slug } });
    if (!post || post.status === 'draft') {
      throw new NotFoundException(`Blog post "${slug}" not found`);
    }
    return serializeBlogPostDetail(post);
  }

  async findEntityById(id: string) {
    const post = await this.repo.findOne({ where: { id } });
    if (!post) throw new NotFoundException(`Blog post "${id}" not found`);
    return post;
  }

  async create(dto: CreateBlogPostDto) {
    const slug = dto.slug?.trim() || slugify(dto.title);
    const existing = await this.repo.findOne({ where: { slug } });
    if (existing) {
      throw new ConflictException(`Blog slug "${slug}" already exists`);
    }

    const maxOrder = await this.repo
      .createQueryBuilder('b')
      .select('MAX(b.sortOrder)', 'max')
      .getRawOne<{ max: number | null }>();

    const entity = this.repo.create({
      slug,
      title: dto.title,
      titleAccent: dto.titleAccent,
      excerpt: dto.excerpt,
      category: dto.category,
      categoryLabel: dto.categoryLabel,
      author: dto.author,
      readingTime: dto.readingTime,
      date: dto.date,
      dateISO: dto.dateISO,
      image: dto.image,
      imageAlt: dto.imageAlt,
      article: dto.article ?? null,
      status: dto.status ?? 'published',
      sortOrder: dto.sortOrder ?? (maxOrder?.max ?? 0) + 1,
    });

    if (dto.imageMediaId) {
      entity.image =
        (await this.mediaRelationService.resolveMediaUrl(dto.imageMediaId)) ??
        dto.image;
      entity.imageMediaId = dto.imageMediaId;
    }

    const saved = await this.repo.save(entity);

    if (dto.imageMediaId) {
      await this.mediaRelationService.linkMedia({
        mediaId: dto.imageMediaId,
        entityType: 'blog',
        entityId: saved.id,
        field: 'cover',
      });
    }

    return serializeBlogPostDetail(saved);
  }

  async update(id: string, dto: UpdateBlogPostDto) {
    const post = await this.findEntityById(id);
    const nextSlug = dto.slug?.trim() || post.slug;

    if (nextSlug !== post.slug) {
      const existing = await this.repo.findOne({ where: { slug: nextSlug } });
      if (existing && existing.id !== id) {
        throw new ConflictException(`Blog slug "${nextSlug}" already exists`);
      }
    }

    if (dto.imageMediaId) {
      const resolved = await this.mediaRelationService.linkMedia({
        mediaId: dto.imageMediaId,
        entityType: 'blog',
        entityId: id,
        field: 'cover',
      });
      post.image = resolved.url;
      post.imageMediaId = dto.imageMediaId;
    } else if (dto.image !== undefined) {
      post.image = dto.image;
    }

    Object.assign(post, {
      slug: nextSlug,
      title: dto.title ?? post.title,
      titleAccent: dto.titleAccent ?? post.titleAccent,
      excerpt: dto.excerpt ?? post.excerpt,
      category: dto.category ?? post.category,
      categoryLabel: dto.categoryLabel ?? post.categoryLabel,
      author: dto.author ?? post.author,
      readingTime: dto.readingTime ?? post.readingTime,
      date: dto.date ?? post.date,
      dateISO: dto.dateISO ?? post.dateISO,
      imageAlt: dto.imageAlt ?? post.imageAlt,
      article: dto.article ?? post.article,
      status: dto.status ?? post.status,
      sortOrder: dto.sortOrder ?? post.sortOrder,
    });

    const saved = await this.repo.save(post);
    return serializeBlogPostDetail(saved);
  }

  async remove(id: string) {
    const post = await this.findEntityById(id);
    await this.repo.remove(post);
    return { success: true };
  }

  async syncFromContent(items: BlogInput[]) {
    await this.repo.clear();
    const entities = items.map((item, index) =>
      this.repo.create({
        slug: item.slug,
        title: item.title,
        titleAccent: item.titleAccent,
        excerpt: item.excerpt,
        category: item.category,
        categoryLabel: item.categoryLabel,
        author: item.author,
        readingTime: item.readingTime,
        date: item.date,
        dateISO: item.dateISO,
        image: item.image,
        imageAlt: item.imageAlt,
        article: item.article ?? null,
        status: item.status ?? 'published',
        sortOrder: index,
      }),
    );
    if (entities.length) await this.repo.save(entities);
  }
}
