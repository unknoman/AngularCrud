import { Injectable } from '@angular/core';
import {UsuarioInterface} from '../../modelos/persona.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  Persona1 = new UsuarioInterface();

    constructor(private http:HttpClient) {
      
   } 

 private url = environment.apiUrl;

  getUserAll():Observable<UsuarioInterface[]>{
   let direccion = this.url +'usuario/listar';
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

  async eliminarUsuario(Persona: UsuarioInterface){
    await Swal.fire({
      title: 'Estas seguro que desea borrar al usuario ' + Persona.usuario1 + '?',
      text: "Esta acción no se podra revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borrado!',
          'El usuario fue eliminado.',
          'success'
        )
      }
    })
  }


  async crearUsuario() {
    const roles = ['Admin', 'Usuario', 'Invitado'];
    const { value: formValues } = await Swal.fire({
      title: 'Crear Usuario',
      html: `<input id="swal-input1" class="swal2-input" placeholder="Usuario">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Contraseña">` +
        `<select id="swal-select1" class="swal2-input">
          <option value="">Seleccionar rol</option>
          ${roles.map((rol) => `<option value="${rol}">${rol}</option>`)}
        </select>`,
      focusConfirm: false,
      preConfirm: () => {
        const usuario = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const contrasena = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const rol = (document.getElementById('swal-select1') as HTMLSelectElement).value;
        if (!usuario || !contrasena || !rol) {
          Swal.showValidationMessage('Por favor, complete todos los campos');
        }
        return { usuario, contrasena, rol };
      },
    });
  
    if (formValues) {
      console.log(formValues);
      // hacer la petición con los datos del usuario
    } 
  }
} 




