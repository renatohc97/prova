import { Component } from '@angular/core';
import { UsuarioService, Usuario } from '../../../services/usuario.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {
  usuario: Usuario = { id: 0, nome: '', email: '', senha: '' };
  mensagem: string = '';
  editando = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.usuarioService.getUsuarioById(Number(id)).subscribe({
        next: usuario => this.usuario = usuario,
        error: () => this.mensagem = 'Erro ao carregar usuário para edição.'
      });
    }
  }

  onSubmit() {
    if (this.editando) {
      this.usuarioService.updateUsuario(this.usuario).subscribe({
        next: () => {
          this.mensagem = 'Usuário atualizado com sucesso!';
          setTimeout(() => this.router.navigate(['/usuarios']), 1200);
        },
        error: () => {
          this.mensagem = 'Erro ao atualizar usuário!';
        }
      });
    } else {
      this.usuarioService.createUsuario(this.usuario).subscribe({
        next: () => {
          this.mensagem = 'Usuário cadastrado com sucesso!';
          setTimeout(() => this.router.navigate(['/usuarios']), 1200);
        },
        error: () => {
          this.mensagem = 'Erro ao cadastrar usuário!';
        }
      });
    }
  }
}