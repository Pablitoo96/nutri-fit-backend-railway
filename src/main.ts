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
    origin: ['http://localhost:8100', 'https://nutri-fit-backend-railway-production-80b9.up.railway.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permite enviar credenciales como cookies, autorización headers o TLS client certificates
    allowedHeaders: 'Content-Type, Authorization', // Asegúrate de incluir todos los headers que tu cliente pueda enviar
  });

  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
