package br.senac.df.spring.service;

import br.senac.df.spring.model.Autor;
import br.senac.df.spring.model.Livros;
import br.senac.df.spring.repositorio.AutorRepositorio;
import br.senac.df.spring.repositorio.LivroRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LivrosService {
    @Autowired
    LivroRepositorio livroRepositorio;
    @Autowired
    AutorRepositorio autorRepositorio;

    public List<Livros> getAllLivros() {
        List<Livros> livros = new ArrayList<Livros>();
        livroRepositorio.findAll().forEach(livros1 -> livros.add(livros1));
        return livros;
    }

    public Livros getLivrosById(int id) {
        return livroRepositorio.findById(id).get();
    }

    public void addLivros(Livros livros, Long autorId) {
        Autor autor = autorRepositorio.findById(autorId).orElseThrow(() -> new RuntimeException("Autor nao encontrado"));
        livros.setAutor(autor);
        livroRepositorio.save(livros);
    }

    public void updateLivros(Livros livros, int id) {
        if (livroRepositorio.existsById(id)) {
            livros.setId(id); // Garante que o ID seja mantido
            livroRepositorio.save(livros);
        } else {
            throw new RuntimeException("Livro com ID " + id + " não encontrado.");
        }
    }

    public void deleteLivros(int id) {
        livroRepositorio.deleteById(id);
    }
}
