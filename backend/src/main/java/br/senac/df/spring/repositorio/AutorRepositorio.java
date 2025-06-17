    package br.senac.df.spring.repositorio;

    import br.senac.df.spring.model.Autor;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    @Repository
    public interface AutorRepositorio extends JpaRepository<Autor,Long> {

    }
