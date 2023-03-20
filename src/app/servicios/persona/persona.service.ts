import { Injectable } from '@angular/core';
import {UsuarioInterface} from '../../modelos/persona.interface';
import { RolesService } from '../roles/roles.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environment';
import { IdtipoNavigation } from 'src/app/modelos/roles.interface';
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
   const options = { cache: 'no-cache' };
   return this.http.get<UsuarioInterface[]>(direccion);
  }

  async modificarUsuario(Persona: UsuarioInterface)
  {
   await Swal.fire({
      title: 'Modificar objeto',
      html:
        '<input id="swal-input1" class="swal2-input" value="' +
        Persona.usuario1 +
        '">' +
        '<input id="swal-input2" class="swal2-input" value="' +
        Persona.password +
        '">',
      focusConfirm: false,
      preConfirm: () => {
        Persona.usuario1 = (document.getElementById(
          'swal-input1'
        ) as HTMLInputElement).value;
        Persona.password = (document.getElementById(
          'swal-input2'
        ) as HTMLInputElement).value;
      }
    });
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

  async crearUsuario() {
    let roles: IdtipoNavigation[] = [];
    this.rolService.getRolAll().subscribe(rol => {
      roles = rol;
      Swal.fire({
        title: 'Crear Usuario',
        html: '<input id="swal-input1" class="swal2-input" placeholder="Usuario">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Contraseña">' +
        '<select id="swal-select1" class="swal2-input">' +
        '<option value="">Seleccionar rol</option>' +
        roles.map((rol : IdtipoNavigation) => '<option value="' + rol.idtipo + '">' + rol.tipo + '</option>') +
        '</select>',
        focusConfirm: false,
        preConfirm: () => {
          const usuario = new UsuarioInterface();
           usuario.usuario1 = (document.getElementById('swal-input1') as HTMLInputElement).value;
          usuario.password = (document.getElementById('swal-input2') as HTMLInputElement).value;
          const rol = (document.getElementById('swal-select1') as HTMLSelectElement).value;
          if (!usuario.usuario1 || !usuario.password || !rol) {
            Swal.showValidationMessage('Por favor, complete todos los campos');
          }
          return { usuario, rol };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(result.value);
          // hacer la petición con los datos del usuario
        }
      });
    });
  }

} 




