import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogCategory } from './entities/blog-category.entity';
import {
  CreateBlogCategoryDto,
  UpdateBlogCategoryDto,
} from './dto/blog-category.dto';

@Injectable()
export class BlogCategoryService {
  constructor(
    @InjectRepository(BlogCategory)
    private readonly repo: Repository<BlogCategory>,
  ) {}

  async findAll(includeDrafts = false) {
    const categories = await this.repo.find({
      order: { sortOrder: 'ASC', createdAt: 'ASC' },
    });
    const filtered = includeDrafts
      ? categories
      : categories.filter((c) => c.status !== 'draft');
    return filtered.map((c) => ({ id: c.id, label: c.label }));
  }

  async findEntityById(id: string) {
    const category = await this.repo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Blog category "${id}" not found`);
    }
    return category;
  }

  async create(dto: CreateBlogCategoryDto) {
    const existing = await this.repo.findOne({ where: { id: dto.id } });
    if (existing) {
      throw new ConflictException(`Category "${dto.id}" already exists`);
    }

    const maxOrder = await this.repo
      .createQueryBuilder('c')
      .select('MAX(c.sortOrder)', 'max')
      .getRawOne<{ max: number | null }>();

    const entity = this.repo.create({
      id: dto.id,
      label: dto.label,
      sortOrder: dto.sortOrder ?? (maxOrder?.max ?? 0) + 1,
      status: dto.status ?? 'published',
    });

    const saved = await this.repo.save(entity);
    return { id: saved.id, label: saved.label };
  }

  async update(id: string, dto: UpdateBlogCategoryDto) {
    const category = await this.findEntityById(id);
    if (dto.label !== undefined) category.label = dto.label;
    if (dto.sortOrder !== undefined) category.sortOrder = dto.sortOrder;
    if (dto.status !== undefined) category.status = dto.status;
    const saved = await this.repo.save(category);
    return { id: saved.id, label: saved.label };
  }

  async remove(id: string) {
    const category = await this.findEntityById(id);
    await this.repo.remove(category);
    return { success: true };
  }

  async syncFromContent(
    items: Array<{ id: string; label: string }>,
  ) {
    await this.repo.clear();
    const entities = items.map((item, index) =>
      this.repo.create({
        id: item.id,
        label: item.label,
        sortOrder: index,
        status: 'published',
      }),
    );
    if (entities.length) await this.repo.save(entities);
  }
}
