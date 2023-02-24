import { Injectable } from '@angular/core';
import {UsuarioInterface} from '../../modelos/persona.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http:HttpClient) { } 

 url:string = "https://localhost:7196/";

  getUserAll():Observable<UsuarioInterface[]>{
   let direccion = this.url +'usuario/listar';
   return this.http.get<UsuarioInterface[]>(direccion);
  }
}


