import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { Observable } from 'rxjs';
import { IdtipoNavigation } from 'src/app/modelos/roles.interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http:HttpClient) { }

 private url = environment.apiUrl;


  getRolAll():Observable<IdtipoNavigation[]>{
    let direccion = this.url + 'roles/listartipo';
    return  this.http.get<IdtipoNavigation[]>(direccion);
  }


}
