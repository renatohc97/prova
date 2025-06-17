import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Autor, AutorService } from '../../../services/autor.service';

@Component({
  selector: 'app-autor-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './autor-list.component.html',
  styleUrls: ['./autor-list.component.css']
})
export class AutorListComponent implements OnInit {
  autores: Autor[] = [];

  constructor(private autorService: AutorService) {}

  ngOnInit() {
    this.autorService.getAutores().subscribe({
      next: (dados) => this.autores = dados,
      error: (erro) => console.error('Erro ao buscar autores:', erro)
    });
  }

  excluirAutor(autor: Autor) {
    if (confirm('Deseja realmente excluir este autor?')) {
      this.autorService.deleteAutor(autor.id).subscribe({
        next: () => this.autores = this.autores.filter(a => a.id !== autor.id),
        error: () => alert('Erro ao excluir autor!')
      });
    }
  }
}
