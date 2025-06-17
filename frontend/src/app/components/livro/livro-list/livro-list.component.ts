import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Livro, LivroService } from '../../../services/livro.service';

@Component({
  selector: 'app-livro-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './livro-list.component.html',
  styleUrls: ['./livro-list.component.css']
})
export class LivroListComponent implements OnInit {
  livros: Livro[] = [];

  constructor(private livroService: LivroService) {}

  ngOnInit() {
    this.livroService.getLivros().subscribe({
      next: (dados) => this.livros = dados,
      error: (erro) => console.error('Erro ao buscar livros:', erro)
    });
  }

  excluirLivro(livro: Livro) {
    if (confirm('Deseja realmente excluir este livro?')) {
      this.livroService.deleteLivro(livro.id).subscribe({
        next: () => this.livros = this.livros.filter(l => l.id !== livro.id),
        error: () => alert('Erro ao excluir livro!')
      });
    }
  }
}
