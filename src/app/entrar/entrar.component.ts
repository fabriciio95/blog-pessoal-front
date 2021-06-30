import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0, 0)
  }

  entrar() {
    this.authService.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp

      environment.token = this.usuarioLogin.token
      environment.foto = this.usuarioLogin.foto
      environment.id = this.usuarioLogin.id
      environment.nome = this.usuarioLogin.nome

      this.router.navigate(['/inicio'])
    }, erro => {
      if(erro.status == 401) {
        alert("Usuário ou senha inválidos!")
      }
    })
  }
}
