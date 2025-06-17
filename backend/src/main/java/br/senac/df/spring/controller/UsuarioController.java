package br.senac.df.spring.controller;

import br.senac.df.spring.model.Usuario;
import br.senac.df.spring.repositorio.UsuarioRepositorio;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioRepositorio usuarioRepositorio;

    public UsuarioController(UsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    @GetMapping
    public List<Usuario> listar() {
        return usuarioRepositorio.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Usuario> buscarPorId(@PathVariable Long id) {
        return usuarioRepositorio.findById(id);
    }

    @PostMapping
    public Usuario criar(@RequestBody Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }

    @PutMapping("/{id}")
    public Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        usuario.setId(id);
        return usuarioRepositorio.save(usuario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        usuarioRepositorio.deleteById(id);
    }
}
