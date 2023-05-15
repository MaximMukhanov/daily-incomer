import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app/app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: setup SWAGGER
  // const options = new DocumentBuilder()
  //   .setTitle('Incomer API')
  //   .setDescription('The Incomer API description')
  //   .setVersion('1.0')
  //   .addTag('incomer')
  //   .addBearerAuth()
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(helmet());
  await app.listen(parseInt(process.env.API_PORT, 10) || 3001);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
