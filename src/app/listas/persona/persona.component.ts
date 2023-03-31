import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../servicios/persona/persona.service';
import { UsuarioInterface } from 'src/app/modelos/persona.interface';
import { IdtipoNavigation } from 'src/app/modelos/roles.interface';
import { RolesService } from 'src/app/servicios/roles/roles.service';
import { NotificacionesService } from 'src/app/sweetalert/notificaciones.service';
import Swal from 'sweetalert2';
import { personaCrear } from 'src/app/modelos/personaCrear.interface';

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

async modificarUsuario(Persona: UsuarioInterface)
{
  let roles: IdtipoNavigation[] = [];
 const usuario = new personaCrear();
 usuario.idusuario = Persona.idusuario;
 usuario.usuario1 = Persona.usuario1;
 usuario.password = Persona.password;
  this.rolesList.getRolAll().subscribe(rol => {
    roles = rol;
  Swal.fire({
    title: 'Modificar Usuario: ' + usuario.usuario1,
    html:
      '<input id="swal-input1" class="swal2-input" value="' +
      usuario.usuario1 +
      '">' +
      '<input id="swal-input2" class="swal2-input" value="' +
      usuario.password +
      '">'+ 
      '<select id="swal-select1" class="swal2-input">' +
      '<option value="">Seleccionar rol</option>' +
      roles.map((rol : IdtipoNavigation) => '<option value="' + rol.idtipo + '">' + rol.tipo + '</option>') +
      '</select>'
      ,
    focusConfirm: false,
    preConfirm: () => {
      usuario.usuario1 = (document.getElementById(
        'swal-input1'
      ) as HTMLInputElement).value;
      usuario.password = (document.getElementById(
        'swal-input2'
      ) as HTMLInputElement).value;
      usuario.idtipo = parseInt((document.getElementById('swal-select1') as HTMLInputElement).value);
      return { usuario };
      }
  }).then((result) => {
  if(result.isConfirmed)
  {
    if(result?.value?.usuario)
    {
      this.usuariolist.modificarUsuario(result.value.usuario).then(respuesta =>{
        if(respuesta == true)
        {
          this.getUserAll();
          this.notificaciones.OperacionCorrecta();
        }
      })
    }
  }
  });
})

}



  async crearUsuario() {
    let roles: IdtipoNavigation[] = [];
    this.rolesList.getRolAll().subscribe(rol => {
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
          const usuario = new personaCrear();
          usuario.usuario1 = (document.getElementById('swal-input1') as HTMLInputElement).value;
          usuario.password = (document.getElementById('swal-input2') as HTMLInputElement).value;
          usuario.idtipo = parseInt((document.getElementById('swal-select1') as HTMLSelectElement).value);
          if (!usuario) {
            Swal.showValidationMessage('Por favor, complete todos los campos');
          }
          return { usuario };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(result.value);
          // hacer la petición con los datos del usuario
          if(result?.value?.usuario) // es para comprobar si result no es undefined
          {
           this.usuariolist.crearUsuario(result.value.usuario).then(respuesta => 
            {
              if(respuesta == true)
              {
                this.notificaciones.OperacionCorrecta();
                this.getUserAll();
              }
            }
            ); // se pasa el objeto usuario del sweetAlert
           
          }

        }
      });
    });
  }








}
