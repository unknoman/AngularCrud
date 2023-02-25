import { Injectable } from '@angular/core';
import {UsuarioInterface} from '../../modelos/persona.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http:HttpClient) { } 


 private url = environment.apiUrl;

  getUserAll():Observable<UsuarioInterface[]>{
   let direccion = this.url +'usuario/listar';
   return this.http.get<UsuarioInterface[]>(direccion);
  }
}


