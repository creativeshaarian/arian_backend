import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

/**
 * Clears application-level caches that this Nest API owns.
 * Next.js ISR revalidation is triggered separately by the admin client
 * when SITE_REVALIDATE_URL is configured.
 */
@Controller('admin/cache')
@UseGuards(JwtAuthGuard)
export class CacheAdminController {
  @Post('clear')
  clear() {
    // No in-memory Nest cache layer today — endpoint reserved for future
    // CacheModule / Redis and gives admin a confirmed JWT-protected action.
    return {
      success: true,
      clearedAt: new Date().toISOString(),
      message: 'Backend cache clear acknowledged',
    };
  }
}
