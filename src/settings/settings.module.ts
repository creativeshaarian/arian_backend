import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteSetting } from '../cms/entities/site-setting.entity';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { SettingsAdminController } from './settings-admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SiteSetting])],
  controllers: [SettingsController, SettingsAdminController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
