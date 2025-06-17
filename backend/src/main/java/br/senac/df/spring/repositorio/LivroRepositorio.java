package br.senac.df.spring.repositorio;

import br.senac.df.spring.model.Livros;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LivroRepositorio extends JpaRepository<Livros, Integer> {
List<Livros>findByAutorId(Long autorId);
}
