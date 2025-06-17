import { Component, OnInit } from '@angular/core';
import { Autor, AutorService } from '../../../services/autor.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-autor-form',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './autor-form.component.html',
  styleUrls: ['./autor-form.component.css']
})
export class AutorFormComponent implements OnInit {
  autor: Autor = { id: 0, nome: '', email: '', contato: '' };
  mensagem: string = '';
  editando = false;

  constructor(
    private autorService: AutorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.autorService.getAutorById(Number(id)).subscribe({
        next: autor => this.autor = autor,
        error: () => this.mensagem = 'Erro ao carregar autor para edição.'
      });
    }
  }

  onSubmit() {
    if (this.editando) {
      this.autorService.updateAutor(this.autor).subscribe({
        next: () => {
          this.mensagem = 'Autor atualizado com sucesso!';
          setTimeout(() => this.router.navigate(['/autores']), 1200);
        },
        error: () => {
          this.mensagem = 'Erro ao atualizar autor!';
        }
      });
    } else {
      this.autorService.createAutor(this.autor).subscribe({
        next: () => {
          this.mensagem = 'Autor cadastrado com sucesso!';
          setTimeout(() => this.router.navigate(['/autores']), 1200);
        },
        error: () => {
          this.mensagem = 'Erro ao cadastrar autor!';
        }
      });
    }
  }
}
