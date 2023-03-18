import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../servicios/persona/persona.service';
import { UsuarioInterface } from 'src/app/modelos/persona.interface';
import { IdtipoNavigation } from 'src/app/modelos/roles.interface';
import { RolesService } from 'src/app/servicios/roles/roles.service';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit{

  public usuarios:Array<UsuarioInterface> = [];
  public roles:Array<IdtipoNavigation> = [];

  constructor(private usuariolist:PersonaService, private rolesList:RolesService){}

  ngOnInit(): void {
    this.getUserAll();
  }


  public getUserAll() // get user
  {
    this.usuariolist.getUserAll().subscribe(respuesta => {
      this.usuarios = respuesta;
    });
  }

  public eliminarUsuario(usuario:UsuarioInterface){
     this.usuariolist.eliminarUsuario(usuario);
}

public modificarUsuario(Persona: UsuarioInterface)
{
this.usuariolist.modificarUsuario(Persona);
}


public crearUsuario()
{
this.usuariolist.crearUsuario();
}



}
