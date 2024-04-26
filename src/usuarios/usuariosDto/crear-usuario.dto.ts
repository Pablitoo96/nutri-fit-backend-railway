export class CrearUsuarioDto {
    readonly nombre: string;
    readonly correo: string;
    contrasenya_hash: string;
    readonly edad?: number;
    readonly peso?: number;
    readonly altura?: number;
  }