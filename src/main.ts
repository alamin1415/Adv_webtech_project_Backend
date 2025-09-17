import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


console.log('PUSHER_INSTANCE_ID:', process.env.PUSHER_INSTANCE_ID);
console.log('PUSHER_SECRET_KEY:', process.env.PUSHER_SECRET_KEY);

async function bootstrap() { //main entry point
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    // Enable CORS
  app.enableCors({
    origin: 'http://localhost:4000', //frontend URL
    credentials: true,
  });
    // Serve uploads folder
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // URL path
  });
  await app.listen(3000);
}
bootstrap();
