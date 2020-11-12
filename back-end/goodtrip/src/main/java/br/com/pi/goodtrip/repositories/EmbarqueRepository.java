package br.com.pi.goodtrip.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import br.com.pi.goodtrip.models.Embarque;

@Repository
public interface EmbarqueRepository extends CrudRepository <Embarque, Integer>{
	
	String query = "SELECT * FROM embarques WHERE fk_id_usuario = ?1 AND aceito = ?2";
	@Query(value = query, nativeQuery = true)
	List<Embarque> encontrarEmbarquesDeUsuario(String usuario, Boolean aceito);
}