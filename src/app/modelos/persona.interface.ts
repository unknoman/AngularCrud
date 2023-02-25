import { IdtipoNavigation } from "./roles.interface";

export interface UsuarioInterface{
    idusuario:number;
    usuario1:string;
    password:string;
    idtipoNavigation : IdtipoNavigation;
}