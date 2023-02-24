import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../servicios/persona/persona.service';
import { UsuarioInterface } from 'src/app/modelos/persona.interface';
@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit{

  public usuarios:Array<UsuarioInterface> = [];

  constructor(private usuariolist:PersonaService){}

  ngOnInit(): void {
    this.getUserAll();
  }


  public getUserAll()
  {
    this.usuariolist.getUserAll().subscribe(respuesta => {
      this.usuarios = respuesta;
    });
  }


}
