import { IdtipoNavigation } from "./roles.interface";

export class UsuarioInterface{
    idusuario:number;
    usuario1:string;
    password:string;
    idtipoNavigation : IdtipoNavigation;

    constructor(){
        this.idusuario = 0;
        this.usuario1= '';
        this.password = '';
        this.idtipoNavigation = new IdtipoNavigation();
        }
}


