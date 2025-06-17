package br.senac.df.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"br.senac.df.spring"})
@EnableJpaRepositories("br.senac.df.spring.repositorio")
@EntityScan("br.senac.df.spring.model")
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}


}
