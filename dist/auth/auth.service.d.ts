import { OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { AdminUser } from './entities/admin-user.entity';
import { LoginDto } from './dto/login.dto';
export declare class AuthService implements OnModuleInit {
    private readonly userRepo;
    private readonly jwtService;
    private readonly config;
    constructor(userRepo: Repository<AdminUser>, jwtService: JwtService, config: ConfigService);
    onModuleInit(): Promise<void>;
    login(dto: LoginDto): Promise<{
        success: boolean;
        accessToken: string;
    }>;
}
