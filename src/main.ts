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
    origin: true, // Permite cualquier origen, o especifica los necesarios
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false, // Asegura que NestJS maneje las solicitudes de pre-vuelo
    optionsSuccessStatus: 204 // Establece un código de estado para respuestas de pre-vuelo exitosas
  });


  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
