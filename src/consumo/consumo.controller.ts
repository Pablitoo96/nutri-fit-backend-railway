import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { ConsumoService } from './consumo.service';
import { CrearConsumoDto } from './consumoDto/crear-consumo.dto';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/autenticacion/jwt-auth.guard';

@Controller('consumos')
@UseGuards(JwtAuthGuard)
export class ConsumoController {
    constructor(private readonly consumoService: ConsumoService) {}

    @Post()
    async crear(@Body() crearConsumoDto: CrearConsumoDto) {
        return this.consumoService.crear(crearConsumoDto);
    }

    @Get()
    async findAll() {
        return this.consumoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.consumoService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() actualizarConsumoDto: CrearConsumoDto) {
        return this.consumoService.update(id, actualizarConsumoDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: ObjectId) {
        return this.consumoService.remove("" + id);
    }
    @Get('/usuario/:usuarioId')
    async findByUsuario(@Param('usuarioId') usuarioId: string) {
        return this.consumoService.findByUsuario(usuarioId);
    }

    @Get('/usuario/:usuarioId/fecha')
    async findConsumosByUsuarioAndDate(
        @Param('usuarioId') usuarioId: string,
        @Query('fecha') fecha: string
    ) {
        return this.consumoService.findConsumosByUsuarioAndDate(usuarioId, new Date(fecha));
    }

}
