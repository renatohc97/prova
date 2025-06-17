import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Usuario, UsuarioService } from '../../../services/usuario.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe({
      next: (dados) => this.usuarios = dados,
      error: (erro) => console.error('Erro ao buscar usuários:', erro)
    });
  }
  ;

  novoUsuario() {
    alert('Função para cadastrar novo usuário');
  }

  editarUsuario(usuario: any) {
    alert('Função para editar: ' + usuario.nome);
  }

  excluirUsuario(usuario: Usuario) {
  if (confirm('Deseja realmente excluir este usuário?')) {
    this.usuarioService.deleteUsuario(usuario.id).subscribe({
      next: () => this.usuarios = this.usuarios.filter(u => u.id !== usuario.id),
      error: () => alert('Erro ao excluir usuário!')
    });
  }
}

}