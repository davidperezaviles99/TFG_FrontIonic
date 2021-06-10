import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IEquipoMensaje, IMensaje, IMessage } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  //SERVICIO MENSAJE

  constructor(private _http: HttpClient, private router: Router) { }

  getMensajeList(): Observable<IMensaje[]>{
    return this._http.get<IMensaje[]>(`${environment.base_url}/Mensajes`)
  }

  getEquipoMensajeID(id: number){
    return this._http.get<IMensaje[]>(`${environment.base_url}/Mensajes/getEquipoMensaje/${id}`)
  }

  getMensajes(id: number) {
    return this._http.get<IMensaje[]>(`${environment.base_url}/Mensajes/getUserMensaje/${id}`)
  }

  registerM(mensajeData: IMensaje): Observable<IMensaje> {
    return this._http.post<IMensaje>(`${environment.base_url}/Mensajes/create`, mensajeData)
  }

  updateM(mensajeData: IMensaje): Observable<IMensaje> {
    return this._http.put<IMensaje>(`${environment.base_url}/Mensajes`, mensajeData)
  }

  deleteM(id: number): Observable<IMensaje> {
    return this._http.delete<IMensaje>(`${environment.base_url}/Messages/${id}`)
  }

  createMessage(message: IMessage) {
    return this._http.post<IMessage>(
      `${environment.base_url}/Messages`,
      message
    );
  }

  updateOperatorDemandMessage(equipoMensaje: IEquipoMensaje) {
    return this._http.post<IEquipoMensaje>(
      `${environment.base_url}/Equipos/EquipoMensaje`,
      equipoMensaje
    );
  }

  getEquipoMensajeList(id: number) {
    return this._http
      .get<IEquipoMensaje[]>(
        `${environment.base_url}/Equipos/getEquipoMensajeList/${id}`
      )
      .pipe(tap((resp) => resp.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())));
  }



}