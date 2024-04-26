import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ConsumoSchema } from './consumo.schema'; // Asegúrate de que la ruta sea correcta
import { CrearConsumoDto } from './consumoDto/crear-consumo.dto'; // Asume que has creado este DTO

@Injectable()
export class ConsumoService {
    constructor(@InjectModel('Consumo') private consumoModel: Model<CrearConsumoDto>) {}

    async crear(crearConsumoDto: CrearConsumoDto): Promise<CrearConsumoDto> {
        const nuevoConsumo = new this.consumoModel(crearConsumoDto);
        return nuevoConsumo.save();
    }

    async findAll(): Promise<CrearConsumoDto[]> {
        return this.consumoModel.find().exec();
    }

    async findOne(id: string): Promise<CrearConsumoDto> {
        const consumo = await this.consumoModel.findById(id).exec();
        if (!consumo) {
            throw new NotFoundException('Consumo no encontrado');
        }
        return consumo;
    }

    async update(id: string, actualizarConsumoDto: CrearConsumoDto): Promise<CrearConsumoDto> {
        const consumoActualizado = await this.consumoModel.findByIdAndUpdate(id, actualizarConsumoDto, { new: true }).exec();
        if (!consumoActualizado) {
            throw new NotFoundException('Consumo no encontrado');
        }
        return consumoActualizado;
    }

    async remove(id: string): Promise<CrearConsumoDto> {
        const consumoEliminado = await this.consumoModel.findByIdAndDelete(id).exec();
        if (!consumoEliminado) {
            throw new NotFoundException('Consumo no encontrado');
        }
        return consumoEliminado;
    }

    async findByUsuario(usuarioId: string): Promise<CrearConsumoDto[]> {
        return this.consumoModel.find({ usuario_id: usuarioId }).exec();
    }

    async findConsumosByUsuarioAndDate(usuarioId: string, fecha: Date): Promise<CrearConsumoDto[]> {
        const startOfDay = new Date(fecha);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(fecha);
        endOfDay.setHours(23, 59, 59, 999);

        return this.consumoModel.find({
            usuario_id: usuarioId,
            fecha: { $gte: startOfDay, $lt: endOfDay }
        }).exec();
    }
}
