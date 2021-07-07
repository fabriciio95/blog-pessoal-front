import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken() {
    this.token = { headers: new HttpHeaders().set('Authorization', environment.token)}
  }

  constructor(
    private http: HttpClient
  ) { }

  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>(`${environment.host}/usuarios/login`, usuarioLogin)
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.host}/usuarios`, usuario)
  }

  getByIdUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.host}/usuarios/${id}`, this.token)
  }

  logado() {
    let ok: boolean = false
    if (environment.token != '') {
      ok = true
    }
    return ok
  }
}
