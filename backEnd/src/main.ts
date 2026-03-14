import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Nâng giới hạn cho JSON payload (ví dụ: 10MB)
  app.use(json({ limit: '10mb' }));

  // Nâng giới hạn cho URL-encoded payload (nếu bạn gửi form data nặng)
  app.use(urlencoded({ limit: '10mb', extended: true }));
  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
