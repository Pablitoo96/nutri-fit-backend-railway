import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import  { Model } from 'mongoose';
import { CrearConsumoDto } from './consumoDto/crear-consumo.dto'; // Asume que has creado este DTO
import { CrearAlimentoDto } from 'src/alimentos/alimentosDto/crear-alimento.Dto';

@Injectable()
export class ConsumoService {
    constructor(@InjectModel('Consumo') private consumoModel: Model<CrearConsumoDto>, @InjectModel('Alimento') private alimentoModel: Model<CrearAlimentoDto>) {}

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


    async findConsumosByUsuarioAndDateRange(usuarioId: string, fechaInicio: Date, fechaFin: Date) {
        return this.consumoModel.find({
            usuario_id: usuarioId,
            fecha: { $gte: fechaInicio, $lte: fechaFin }
        }).exec();
    }

    async calcularCaloriasPorDia(usuarioId: string): Promise<any[]> {
        const fechaFin = new Date();
        fechaFin.setUTCHours(23, 59, 59, 999);
        const fechaInicio = new Date(fechaFin);
        fechaInicio.setDate(fechaFin.getDate() - 6); // Para incluir los últimos 7 días
        fechaInicio.setUTCHours(0, 0, 0, 0);
    
        const consumos = await this.consumoModel.find({
          usuario_id: usuarioId,
          fecha: { $gte: fechaInicio, $lte: fechaFin }
        });
    
        // Extraer todos los IDs de alimentos únicos de los consumos
        const alimentoIds = [...new Set(consumos.flatMap(consumo => consumo.consumo_alimentos.map(item => item.alimento_id)))];
    
        // Obtener todos los alimentos necesarios
        const alimentos = await this.alimentoModel.find({ '_id': { $in: alimentoIds } });
    
        // Crear un mapa de ID de alimento a información nutricional
        const alimentoMap = new Map(alimentos.map(alimento => [alimento._id.toString(), alimento]));
    
        // Calcular las calorías por día
        const caloriasPorDia = {};
        consumos.forEach(consumo => {
          const fecha = consumo.fecha.toISOString().split('T')[0]; // Formatea la fecha como 'YYYY-MM-DD'
          consumo.consumo_alimentos.forEach(item => {
            const alimento = alimentoMap.get(item.alimento_id.toString());
            if (alimento) {
              const calorias = alimento.informacion_nutricional.calorias * (item.cantidad_gramos / 100);
              if (!caloriasPorDia[fecha]) {
                caloriasPorDia[fecha] = 0;
              }
              caloriasPorDia[fecha] += calorias;
            }
          });
        });
    
        // Convertir el objeto en un array y ordenarlo
        return Object.entries(caloriasPorDia).map(([fecha, consumoDia]) => ({
          fecha,
          consumoDia
        })).sort((a, b) => a.fecha.localeCompare(b.fecha));
      }


}
