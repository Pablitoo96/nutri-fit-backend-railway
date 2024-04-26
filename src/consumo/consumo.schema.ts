import { Schema } from "mongoose";

const ConsumoAlimentoSchema: Schema = new Schema({
  alimento_id: {
    type: String,
    required: true
  },
  cantidad_gramos: {
    type: Number,
    required: true
  }
});

export const ConsumoSchema: Schema = new Schema({
  usuario_id: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  consumo_alimentos: [ConsumoAlimentoSchema]
}, {
  timestamps: true // Añade automáticamente createdAt y updatedAt
});