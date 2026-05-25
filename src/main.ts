import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // Aplicar ValidationPipe global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remover propiedades no definidas en DTOs
      forbidNonWhitelisted: true, // Rechazar propiedades no definidas
      transform: true, // Transformar tipos de datos (string a number, etc)
      errorHttpStatusCode: 400,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Sistema de Gimnasio API')
    .setDescription('API para gestión de usuarios, clases y autenticación')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'bearer',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
