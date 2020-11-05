package br.com.pi.goodtrip.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import br.com.pi.goodtrip.models.Usuario;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, Integer>{}