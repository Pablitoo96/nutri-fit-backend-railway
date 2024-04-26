class InformacionNutricionalDto {
    readonly calorias: number;
    readonly proteinas: number;
    readonly carbohidratos: number;
    readonly grasas: number;
}

export class CrearAlimentoDto {
    readonly nombre: string;
    readonly informacion_nutricional: InformacionNutricionalDto;
}