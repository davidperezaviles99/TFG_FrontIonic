import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin, IUser } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  login(userData: ILogin): Observable<IUser> {
    return this._http.post<IUser>(`${environment.base_url}/Users/login`, userData)
  }

  
}
