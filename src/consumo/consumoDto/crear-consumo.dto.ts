import mongoose from "mongoose";

class ConsumoAlimentoDto {
    readonly alimento_id: string;
    readonly cantidad_gramos: number;
}

export class CrearConsumoDto {
    readonly usuario_id: string;
    readonly fecha: Date;
    readonly consumo_alimentos: ConsumoAlimentoDto[];
}
