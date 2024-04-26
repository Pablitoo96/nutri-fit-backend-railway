import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
 /* 
  app.enableCors({
    origin: 'http://localhost:8100',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
*/

  // Habilitar CORS para permitir solicitudes de cualquier origen
  app.enableCors({
    origin: true, // Permite cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
  });

  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
