import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAlumno, ILogin, IProfesor, ITutor, IUser, Response } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

//SERVICIO USUARIO.

constructor(private _http: HttpClient, private router: Router) { }

login(userData: ILogin) {
return this._http.post<Response>(`${environment.base_url}/Users/login`, userData )

}

getUser(): IUser {
  return JSON.parse(localStorage.getItem('user'))
}

registerP(profesorData: IProfesor): Observable<IProfesor> {
return this._http.post<IProfesor>(`${environment.base_url}/Profesors/create`, profesorData)
}

updateP(profesorData: IProfesor): Observable<IProfesor> {
return this._http.put<IProfesor>(`${environment.base_url}/Profesors`, profesorData)
}

deleteP(id: number): Observable<IProfesor> {
return this._http.delete<IProfesor>(`${environment.base_url}/Profesors/${id}`)
}

getProfesorList(): Observable<IProfesor[]> {
return this._http.get<IProfesor[]>(`${environment.base_url}/Profesors`)
}

getProfesor(): IProfesor {
return JSON.parse(localStorage.getItem('profesor'))
}

//Tutor
registerT(tutorData: ITutor): Observable<ITutor> {
return this._http.post<ITutor>(`${environment.base_url}/Tutors/create`, tutorData)
}

updateT(tutorData: ITutor): Observable<ITutor> {
return this._http.put<ITutor>(`${environment.base_url}/Tutors`, tutorData)
}

deleteT(id: number): Observable<ITutor> {
return this._http.delete<ITutor>(`${environment.base_url}/Tutors/${id}`)
}

getTutorList(): Observable<ITutor[]> {
return this._http.get<ITutor[]>(`${environment.base_url}/Tutors`)
}

getTutor(): ITutor {
return JSON.parse(localStorage.getItem('tutor'))
}

//Alumno
registerA(alumnoData: IAlumno): Observable<IAlumno> {
return this._http.post<IAlumno>(`${environment.base_url}/Alumnos/create`, alumnoData)
}

updateA(alumnoData: IAlumno): Observable<IAlumno> {
return this._http.put<IAlumno>(`${environment.base_url}/Alumnos`, alumnoData)
}

deleteA(id: number): Observable<IAlumno> {
return this._http.delete<IAlumno>(`${environment.base_url}/Alumnos/${id}`)
}

getAlumnoList(): Observable<IAlumno[]> {
return this._http.get<IAlumno[]>(`${environment.base_url}/Alumnos`)
}

getAlumno(): IAlumno {
return JSON.parse(localStorage.getItem('alumnos'))
}

logout() {
localStorage.clear()
this.router.navigateByUrl('/login')
}

  
}
