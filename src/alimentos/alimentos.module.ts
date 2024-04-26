import { Module } from '@nestjs/common';
import { AlimentosController } from './alimentos.controller';
import { AlimentosService } from './alimentos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Alimento, AlimentoSchema } from './alimentos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Alimento.name, schema: AlimentoSchema }])
  ],
  controllers: [AlimentosController],
  providers: [AlimentosService]
})
export class AlimentosModule {}
