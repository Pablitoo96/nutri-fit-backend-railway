import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlimentoSchema } from './alimentos.schema'; // Asume que tienes un archivo con el esquema de Alimento
import { CrearAlimentoDto } from './alimentosDto/crear-alimento.Dto'; // Asume que tienes un DTO para crear alimentos

@Injectable()
export class AlimentosService {
    constructor(@InjectModel('Alimento') private alimentoModel: Model<CrearAlimentoDto>) {}

    async crear(crearAlimentoDto: CrearAlimentoDto): Promise<CrearAlimentoDto> {
        const nuevoAlimento = new this.alimentoModel(crearAlimentoDto);
        return nuevoAlimento.save();
    }

    async findAll(): Promise<CrearAlimentoDto[]> {
        return this.alimentoModel.find().exec();
    }

    async findOne(id: string): Promise<CrearAlimentoDto> {
        return this.alimentoModel.findById(id).exec();
    }

    async update(id: string, actualizarAlimentoDto: CrearAlimentoDto): Promise<CrearAlimentoDto> {
        return this.alimentoModel.findByIdAndUpdate(id, actualizarAlimentoDto, { new: true }).exec();
    }

    async remove(id: string): Promise<CrearAlimentoDto> {
        return this.alimentoModel.findOneAndDelete({ _id: id }).exec();
    }
}