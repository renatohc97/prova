import { Component, OnInit } from '@angular/core';
import { Livro, LivroService } from '../../../services/livro.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor, AutorService } from '../../../services/autor.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-livro-form',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.css']
})
export class LivroFormComponent implements OnInit {
  livro: Livro = { id: 0, nome: '', preco: 0, autor: { id: 0 } };
  mensagem: string = '';
  editando = false;
  autores: Autor[] = [];

  constructor(
    private livroService: LivroService,
    private autorService: AutorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.autorService.getAutores().subscribe({
      next: autores => this.autores = autores,
      error: () => this.mensagem = 'Erro ao buscar autores.'
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.livroService.getLivroById(Number(id)).subscribe({
        next: livro => this.livro = livro,
        error: () => this.mensagem = 'Erro ao carregar livro para edição.'
      });
    }
  }

  onSubmit() {
    if (this.editando) {
      this.livroService.updateLivro(this.livro).subscribe({
        next: () => {
          this.mensagem = 'Livro atualizado com sucesso!';
          setTimeout(() => this.router.navigate(['/livros']), 1200);
        },
        error: () => {
          this.mensagem = 'Erro ao atualizar livro!';
        }
      });
    }else {
    this.livroService.createLivro(this.livro, this.livro.autor.id).subscribe({
      next: () => {
        this.mensagem = 'Livro cadastrado com sucesso!';
        setTimeout(() => this.router.navigate(['/livros']), 1200);
      },
      error: () => {
        this.mensagem = 'Erro ao cadastrar livro!';
      }
    });
}}}
