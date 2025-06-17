package br.senac.df.spring.controller;

import br.senac.df.spring.model.Livros;
import br.senac.df.spring.service.LivrosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/livros")
public class LivrosController {

    @Autowired
    LivrosService livrosService;

    @GetMapping
    private List<Livros>getALlLivros(){
        return livrosService.getAllLivros();
    }
    @GetMapping("/{id}")
    private Livros getLivrosById(@PathVariable("id") int id){
        return livrosService.getLivrosById(id);
    }

    @PostMapping
    private ResponseEntity<String> addLivros(
            @RequestBody Livros livros,
            @RequestParam Long autorId
    ) {
        livrosService.addLivros(livros, autorId);
        return ResponseEntity.ok("Livro adicionado com sucesso");
    }

    @PutMapping("/{id}")
    private ResponseEntity<String> updateLivros(
            @PathVariable int id,
            @RequestBody Livros livros
    ) {
        livrosService.updateLivros(livros, id);
        return ResponseEntity.ok("Atualizado com sucesso");
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<String> deleteLivros(@PathVariable("id") int id) {
        livrosService.deleteLivros(id);
        return ResponseEntity.ok("Deletado com sucesso");
    }

}
