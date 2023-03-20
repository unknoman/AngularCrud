import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../servicios/persona/persona.service';
import { UsuarioInterface } from 'src/app/modelos/persona.interface';
import { IdtipoNavigation } from 'src/app/modelos/roles.interface';
import { RolesService } from 'src/app/servicios/roles/roles.service';
import { NotificacionesService } from 'src/app/sweetalert/notificaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit{

  public usuarios:Array<UsuarioInterface> = [];
  public roles:Array<IdtipoNavigation> = [];

  constructor(private usuariolist:PersonaService, private rolesList:RolesService, private notificaciones:NotificacionesService){}

  ngOnInit(): void {
    this.getUserAll();
  }


  public getUserAll() // get user
  {
    this.usuariolist.getUserAll().subscribe(respuesta => {
      this.usuarios = respuesta;
    });
  }

 /* public eliminarUsuario(usuario:UsuarioInterface){
     this.usuariolist.eliminarUsuario(usuario);
} */

//-----------
async eliminarUsuario(Persona: UsuarioInterface) {
  Swal.fire({
    title: 'Estas seguro que desea borrar al usuario ' + Persona.usuario1 + '?',
    text: "Esta acción no se podra revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar!'
  }).then((result) => {
    if (result.isConfirmed) {
      // peticion eliminar usuario
      let resultado = this.usuariolist.eliminarUsuario(Persona).then(resultado => {
        if (resultado == true) {
          Swal.fire(
            'Borrado!',
            'El usuario fue eliminado.',
            'success'
          );
          this.getUserAll();
          this.notificaciones.OperacionCorrecta();
        } else {
          Swal.fire(
            'Error!',
            'No se pudo eliminar el usuario.',
            'error'
          );
        }
      });
    }
  });
}


//-----------

public modificarUsuario(Persona: UsuarioInterface)
{
this.usuariolist.modificarUsuario(Persona);
}


public crearUsuario()
{
this.usuariolist.crearUsuario();
}



}
