package br.senac.df.spring.controller;

import br.senac.df.spring.model.Autor;
import br.senac.df.spring.service.AutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/autores")
public class AutorController {
    @Autowired
    private AutorService autorService;

    @GetMapping
    public List<Autor> listarAutores() {
        return autorService.listarAutores();
    }

    @GetMapping("/{id}")
    public Autor obterAutorPorId(@PathVariable Long id) {
        return autorService.obterAutorPorId(id);
    }

    @PostMapping
    public Autor criarAutor(@RequestBody Autor autor) {
        return autorService.addAutor(autor);
    }
    @PutMapping("/{id}")
    public void updateAutor(@PathVariable Long id, @RequestBody Autor autor) {
        autorService.updateAutor(autor, id);
    }

    @DeleteMapping("/{id}")
    public void deleteAutor(@PathVariable Long id) {
        autorService.deleteAutor(id);
    }
}
