import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // সব API এবং সব ডোমেইনের জন্য CORS সক্রিয় করা
  app.enableCors({
    origin: '*', // সব ডোমেইন থেকে অনুমোদন
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // যদি cookies ব্যবহার করা হয়
  });

  // PORT environment variable বা default 3000 ব্যবহার করা
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  await app.listen(port);

  console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
