import { Injectable } from '@angular/core';
import {UsuarioInterface} from '../../modelos/persona.interface';
import { RolesService } from '../roles/roles.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environment';
import { IdtipoNavigation } from 'src/app/modelos/roles.interface';
import { personaCrear } from 'src/app/modelos/personaCrear.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

    constructor(private http:HttpClient, private rolService:RolesService) {
      
   } 

 private url = environment.apiUrl;

  getUserAll():Observable<UsuarioInterface[]>{
   let direccion = this.url +'usuario/listar';
   return this.http.get<UsuarioInterface[]>(direccion);
  }

  async modificarUsuario(Persona: personaCrear) : Promise<boolean>
  {
    let direccion = this.url +'usuario/actualizar';
    const respuesta = await firstValueFrom(this.http.put(direccion, Persona));
     if(respuesta == true)
       return true;
     else
     return false;
  }

  async eliminarUsuario(Persona: UsuarioInterface): Promise<boolean> {
   let direccion = this.url +'usuario/borrar/?id=' + Persona.idusuario;
   try
   {
    const respuesta = await firstValueFrom(this.http.delete(direccion));
    if(respuesta == true)
      return true
     else 
      return false;
   } catch (error)
   {
         console.log(error);
         return false;
   }
    }

  roles: IdtipoNavigation[] = [];

 async crearUsuario(PersonaCrear: personaCrear): Promise<boolean>{
  let direccion = this.url +'usuario/crear';
  const respuesta = await firstValueFrom(this.http.post(direccion, PersonaCrear));
  console.log(respuesta);
   if(respuesta == true)
    return true;
   else
   return false;
 }

} 




