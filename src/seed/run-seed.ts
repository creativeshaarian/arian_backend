import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

async function runSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    console.log('Seed completed: admin user and content initialized via module hooks.');
  } finally {
    await app.close();
  }
}

runSeed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
