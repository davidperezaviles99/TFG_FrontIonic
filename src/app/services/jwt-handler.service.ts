import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { IJwt } from '../interfaces/IJWT';

@Injectable({
  providedIn: 'root'
})
export class JwtHandlerService {

  //SERVICIO JSON WEB TOKEN

  constructor(private router:Router) { }

  saveJWT(token: string): void {
    localStorage.setItem('jwt', token);
    const tokenDecode: IJwt = jwt_decode(token);
    console.log(tokenDecode);
    localStorage.setItem('user_id', tokenDecode.uid);
  }

  getJWT(): string {
    return localStorage.getItem('jwt');
  }

  deleteJWT(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user_id');
    this.router.navigateByUrl("/login");
  }

}