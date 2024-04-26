import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class InformacionNutricional {
  @Prop({ required: true })
  calorias: number;

  @Prop({ required: true })
  proteinas: number;

  @Prop({ required: true })
  carbohidratos: number;

  @Prop({ required: true })
  grasas: number;
}

@Schema()
export class Alimento extends mongoose.Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, type: InformacionNutricional })
  informacion_nutricional: InformacionNutricional;
}

export const AlimentoSchema = SchemaFactory.createForClass(Alimento);
