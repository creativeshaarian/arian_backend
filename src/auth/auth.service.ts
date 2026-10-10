import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AdminUser } from './entities/admin-user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(AdminUser)
    private readonly userRepo: Repository<AdminUser>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit() {
    const username = this.config.get<string>('ADMIN_USERNAME', 'arian');
    const password = this.config.get<string>('ADMIN_PASSWORD', '123456');
    const passwordHash = await bcrypt.hash(password, 10);
    const existing = await this.userRepo.findOne({ where: { username } });

    if (!existing) {
      await this.userRepo.save({ username, passwordHash });
      return;
    }

    const valid = await bcrypt.compare(password, existing.passwordHash);
    if (!valid) {
      existing.passwordHash = passwordHash;
      await this.userRepo.save(existing);
    }
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { username: dto.username } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, username: user.username };
    return {
      success: true,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
