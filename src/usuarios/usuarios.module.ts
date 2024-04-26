/*import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from './usuarios.schema';

@Module({
  imports: [MongooseModule.forFeature(
    [{
      name:'Usuario',
      schema: UsuarioSchema,
    }]
)],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}
*/

import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from './usuarios.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/autenticacion/estrategia-jwt'; // Asegúrate de crear esta clase de estrategia

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Usuario', schema: UsuarioSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'tuClaveSecreta', // Usa una clave secreta segura y configúrala preferentemente en las variables de entorno
      signOptions: { expiresIn: '10d' }, // Configura el tiempo de expiración del token según tus necesidades
    }),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, JwtStrategy] // Añade JwtStrategy a los proveedores si estás implementando una estrategia de JWT
})
export class UsuariosModule {}