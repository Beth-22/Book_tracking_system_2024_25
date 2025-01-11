import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for the frontend at localhost:5000
  app.enableCors({
    origin: 'http://127.0.0.1:5500', // Allow requests from the frontend
    methods: 'GET,POST,PUT,DELETE', // Allow specific HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
  });

  await app.listen(7000);
}
bootstrap();
