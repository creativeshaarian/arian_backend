"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
async function runSeed() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        console.log('Seed completed: admin user and content initialized via module hooks.');
    }
    finally {
        await app.close();
    }
}
runSeed().catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
});
//# sourceMappingURL=run-seed.js.map