import { Module } from '@nestjs/common';
import { ConsumoController } from './consumo.controller';
import { ConsumoService } from './consumo.service';
import { MongooseModule } from '@nestjs/mongoose';

import {ConsumoSchema} from "./consumo.schema";
import { AlimentoSchema } from 'src/alimentos/alimentos.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Consumo', // Usa la propiedad 'name' del modelo si está disponible
                schema: ConsumoSchema,
            },
            {
                name: 'Alimento', // Añade el modelo Alimento
                schema: AlimentoSchema,
            }
        ])
    ],
    controllers: [ConsumoController],
    providers: [ConsumoService]
})
export class ConsumoModule {}