package br.com.pi.goodtrip.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.pi.goodtrip.models.Viagem;

@Repository
public interface ViagemRepository extends CrudRepository<Viagem, Integer>{
	
	String selectByUserId = "SELECT * FROM viagens WHERE fk_id_usuario = :usuario AND finalizada = :finalizada";
	
	@Query(value = selectByUserId, nativeQuery = true)
	List<Viagem> encontrarViagensDeUsuario(String usuario, Boolean finalizada);
}