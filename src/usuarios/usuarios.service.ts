import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CrearUsuarioDto } from './usuariosDto/crear-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(@InjectModel('Usuario')private crearUsuarioDto: Model<CrearUsuarioDto>) {}

  async validateUser(username: string, password: string): Promise<CrearUsuarioDto | null> {
    const user = await this.crearUsuarioDto.findOne({ correo: username })
    console.log(user)
    if (user && await this.comparePasswords(password, user.contrasenya_hash)) {
      const { ...result } = user.toObject();
      return result;
    }
    return null;
  }

  // Método auxiliar para comparar contraseñas, asumiendo que las contraseñas están hasheadas
  private async comparePasswords(providedPass: string, storedPass: string): Promise<boolean> {
    const passwordMatch = await bcrypt.compare(providedPass, storedPass);
    return passwordMatch; // Sustituye esto por una comparación real en producción
  }

  async crear(crearUsuarioDto: CrearUsuarioDto): Promise<CrearUsuarioDto> {
    const correoExistente = await this.crearUsuarioDto.findOne({ correo: crearUsuarioDto.correo });
    if (correoExistente) {
      throw new BadRequestException('Ya existe un usuario con este correo electrónico');
    }
    const nuevoUsuario = new this.crearUsuarioDto(crearUsuarioDto);
    return nuevoUsuario.save();
  }

  async findAll(): Promise<CrearUsuarioDto[]> {
    return this.crearUsuarioDto.find().exec();
  }

  async findOne(id: any ): Promise<CrearUsuarioDto> {
    return this.crearUsuarioDto.findById(id).exec();
  }

  async update(id: string, actualizarUsuarioDto: CrearUsuarioDto): Promise<CrearUsuarioDto> {
    return this.crearUsuarioDto.findByIdAndUpdate(id, actualizarUsuarioDto, { new: true }).exec();
  }

  async remove(id: ObjectId): Promise<CrearUsuarioDto> {
    return this.crearUsuarioDto.findOneAndDelete(id).exec();
  }

  async findOneByCorreo(correo: string): Promise<CrearUsuarioDto | null> {
    return this.crearUsuarioDto.findOne({ correo }).exec();
  }
  

}