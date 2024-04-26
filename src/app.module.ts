import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AlimentosModule } from './alimentos/alimentos.module';
import { ConsumoModule } from './consumo/consumo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://root:root@cluster0.k211wt6.mongodb.net/NutriCal?retryWrites=true&w=majority'),
    UsuariosModule,
    AlimentosModule,
    ConsumoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
