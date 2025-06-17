package br.senac.df.spring.service;

import br.senac.df.spring.model.Usuario;
import br.senac.df.spring.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public Usuario autenticar(String email, String senha) {
        Usuario usuario = usuarioRepositorio.findByEmail(email);
        if (usuario != null && usuario.getSenha().equals(senha)) {
            return usuario;
        }
        return null;
    }
}
