import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

 
@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAll(): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${environment.host}/temas`, this.token)
  }

  getById(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${environment.host}/temas/${id}`, this.token)
  }

  post(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(`${environment.host}/temas`, tema, this.token)
  }

  put(tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(`${environment.host}/temas`, tema, this.token)
  }

  delete(id: number) {
    return this.http.delete(`${environment.host}/temas/${id}`, this.token)
  }
}
