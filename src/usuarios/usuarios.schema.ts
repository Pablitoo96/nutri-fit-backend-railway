import { Schema } from "mongoose";

export const UsuarioSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
    },
    contrasenya_hash: {
        type: String,
        required: true
    },
    edad: {
        type: Number
    },
    peso: {
        type: Number
    },
    altura: {
        type: Number
    }
});
