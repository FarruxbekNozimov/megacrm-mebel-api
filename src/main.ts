import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      allowedHeaders: ['content-type'],
      origin: ['http://localhost:5174', 'http://localhost:5173', '*'],
      credentials: true,
    });

    const PORT = process.env.PORT || 7000;


    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
      .setTitle('NestJS TEST')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('NodeJS, NestJS, MongoDB, mongoose')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    app.use(cookieParser());

    app.listen(PORT, () => {
      console.log(`Server ${PORT} da yuguryapti...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
