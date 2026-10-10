"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const app_module_1 = require("./app.module");
function getCorsOrigins(config) {
    const origins = new Set();
    const frontendUrl = config.get('FRONTEND_URL');
    if (frontendUrl)
        origins.add(frontendUrl.trim());
    const corsOrigins = config.get('CORS_ORIGINS', '');
    for (const origin of corsOrigins.split(',')) {
        const trimmed = origin.trim();
        if (trimmed)
            origins.add(trimmed);
    }
    if (origins.size === 0) {
        origins.add('http://localhost:3000');
        origins.add('http://localhost:3001');
    }
    return Array.from(origins);
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    app.setGlobalPrefix('api');
    app.useStaticAssets((0, path_1.join)(process.cwd(), 'uploads'), {
        prefix: '/uploads',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
    }));
    app.enableCors({
        origin: (origin, callback) => {
            const allowed = getCorsOrigins(config);
            if (!origin)
                return callback(null, true);
            if (allowed.includes(origin) || allowed.includes('*')) {
                return callback(null, true);
            }
            if (origin.endsWith('.vercel.app') ||
                origin.includes('localhost') ||
                origin.includes('127.0.0.1')) {
                return callback(null, true);
            }
            return callback(new Error(`CORS blocked for origin: ${origin}`), false);
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });
    const port = config.get('PORT', 3002);
    await app.listen(port);
    const apiUrl = config.get('API_URL', `http://localhost:${port}`);
    console.log(`API running on ${apiUrl}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map