import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { ProjectsModule } from './projects/projects.module';
import { BlogModule } from './blog/blog.module';
import { HealthModule } from './health/health.module';
import { MediaModule } from './media/media.module';
import { CmsModule } from './cms/cms.module';
import { SettingsModule } from './settings/settings.module';
import { getDatabaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    AuthModule,
    ContentModule,
    ProjectsModule,
    BlogModule,
    MediaModule,
    CmsModule,
    SettingsModule,
    HealthModule,
  ],
})
export class AppModule {}
