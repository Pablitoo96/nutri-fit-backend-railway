import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { AlimentosService } from './alimentos.service';
import { CrearAlimentoDto } from './alimentosDto/crear-alimento.Dto';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/autenticacion/jwt-auth.guard';

@Controller('alimentos')
@UseGuards(JwtAuthGuard)
export class AlimentosController {
    constructor(private readonly alimentosService: AlimentosService) {}

    @Post()
    async crear(@Body() crearAlimentoDto: CrearAlimentoDto) {
        return await this.alimentosService.crear(crearAlimentoDto);
    }

    @Get()
    async findAll() {
        return await this.alimentosService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.alimentosService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() actualizarAlimentoDto: CrearAlimentoDto) {
        return await this.alimentosService.update(id, actualizarAlimentoDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: ObjectId) {
        return await this.alimentosService.remove(""+id);
    }
}
