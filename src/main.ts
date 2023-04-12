import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { BearerGuard } from './security/bearer/bearer.guard.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // VERSIONNING
  app.enableVersioning({
    type: VersioningType.URI,
  });

  //-------- SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Form Earth to Moon API')
    .setDescription('A codelab to discover NestJs and more')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //------- IN & OUT
  // Enables global behaviors on incoming DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Only exposed attributes will be accepted on incoming DTO
      transform: true, // Automatically converts attributes from incoming DTO when possible
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Enables global behaviors on outgoing entities
  // For examples, @Exclude decorators will be processed
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // SECURITY
  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalGuards(new BearerGuard(configService));

  await app.listen(configService.get('port'));
}
bootstrap();
