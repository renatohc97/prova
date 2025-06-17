package br.senac.df.spring.service;

import br.senac.df.spring.model.Autor;
import br.senac.df.spring.repositorio.AutorRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AutorService {
    private final AutorRepositorio autorRepositorio;

    @Autowired
    public AutorService(AutorRepositorio autorRepositorio) {
        this.autorRepositorio = autorRepositorio;
    }

    public List<Autor> listarAutores() {
        return autorRepositorio.findAll();
    }

    public Autor obterAutorPorId(Long id) {
        return autorRepositorio.findById(id).orElse(null);
    }

    public Autor addAutor(Autor autor) {
        return autorRepositorio.save(autor);
    }

    public Autor updateAutor(Autor autor, Long id) {
        Optional<Autor> autorExistente = autorRepositorio.findById(id);
        if (autorExistente.isPresent()) {
            autor.setId(id); // Garante que o ID seja mantido
            return autorRepositorio.save(autor);
        } else {
            throw new RuntimeException("Autor com ID " + id + " não encontrado.");
        }
    }

    public void deleteAutor(Long id) {
        if (autorRepositorio.existsById(id)) {
            autorRepositorio.deleteById(id);
        } else {
            throw new RuntimeException("Autor com ID " + id + " não encontrado.");
        }
    }
}
