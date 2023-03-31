import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class JwtserviceService {

  constructor() { }


  decodificartoken(token: string){
    const decodedToken = jwt.decode(token);
    if (decodedToken) 
       return decodedToken;
     else 
    return false;
  }
}
