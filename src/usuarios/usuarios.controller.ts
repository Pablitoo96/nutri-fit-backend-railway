import { Controller, Get, Post, Body, Param, Delete, Put, UnauthorizedException, BadRequestException, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './usuariosDto/crear-usuario.dto';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/autenticacion/jwt-auth.guard';
import * as bcrypt from 'bcrypt';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService, @InjectModel('Usuario') private usuarioModel: Model<CrearUsuarioDto>, private readonly jwtService: JwtService) {}

  @Post('login')
  async login(@Body() body: { username?: string, password?: string }) {
    if (!body.username || !body.password) {
      // Lanzar una excepción si el nombre de usuario o la contraseña no están presentes
      throw new BadRequestException('Se requieren nombre de usuario y contraseña');
    }

    const user = await this.usuariosService.validateUser(body.username, body.password);
    if (!user) {
      // Lanzar una excepción si las credenciales son incorrectas
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { username: user.correo, sub: user.nombre };
    return {
      access_token: this.jwtService.sign(payload),
      username: body.username
    }
  }


  @Post()
  async crear(@Body() crearUsuarioDto: CrearUsuarioDto) {
    const hashedPassword = await bcrypt.hash(crearUsuarioDto.contrasenya_hash, 10); // 10 es el costo del hash, puedes ajustarlo según tus necesidades
    crearUsuarioDto.contrasenya_hash = hashedPassword;
    return await this.usuariosService.crear(crearUsuarioDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.usuariosService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.usuariosService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() CrearUsuarioDto: CrearUsuarioDto) {
    return await this.usuariosService.update(id, CrearUsuarioDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: ObjectId) {
    return await this.usuariosService.remove(id);
  }

  @Get('/correo/:correo')
  @UseGuards(JwtAuthGuard)
  async findOneByCorreo(@Param('correo') correo: string) {
    return await this.usuariosService.findOneByCorreo(correo);
  }
  
}
