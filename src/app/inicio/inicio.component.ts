import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthServiceService } from '../service/auth-service.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  postagens: Postagem[]
  
  tema: Tema = new Tema()
  temas: Tema[]
  idTema: number

  usuario: Usuario = new Usuario()

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthServiceService
  ) { }

  ngOnInit() {
    if(environment.token == '') {
      this.router.navigate(['/entrar'])
    }
    
    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas() {
    this.temaService.refreshToken()
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.temas = resp
    })
  }

  findByIdTema() {
    this.temaService.refreshToken()
    this.temaService.getById(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  getAllPostagens() {
    this.postagemService.refreshToken()
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => this.postagens = resp)
  }

  findByIdUsuario() {
    this.authService.refreshToken()
    this.authService.getByIdUsuario(environment.id).subscribe((resp: Usuario) => this.usuario = resp)
  }

  publicar() {
    this.postagemService.refreshToken()
    this.usuario.id = environment.id
    this.postagem.usuario = this.usuario
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }


}
