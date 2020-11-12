package br.com.pi.goodtrip.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.pi.goodtrip.models.Embarque;

@Repository
public interface EmbarqueRepository extends CrudRepository <Embarque, Integer>{
	
	String selectByTravelId = "SELECT * FROM embarques WHERE fk_id_viagem = ?1 AND finalizada = ?2";
	
	String selectByUserId = "SELECT * FROM embarques WHERE fk_id_usuario = ?1 AND aceito = ?2";
	
	String deleteById = "DELETE FROM embarques WHERE id=:id";
	
	String selectByUserIdAndTravelId = "SELECT * FROM embarques WHERE fk_id_usuario=:iduser AND fk_id_viagem=:idtrip";
	
	@Modifying
	@Transactional
	@Query(value = deleteById, nativeQuery = true)
	void apagarEmbarque(int id);
	
	@Query(value = selectByTravelId, nativeQuery = true)
	List<Embarque> encontrarEmbarquesDeViagem(String viagem, Boolean finalizada);
	
	@Query(value = selectByUserId, nativeQuery = true)
	List<Embarque> encontrarEmbarquesDeUsuario(String usuario, Boolean aceito);
	
	@Query(value = selectByUserIdAndTravelId, nativeQuery = true)
	List<Embarque> encontrarEmbarque(int iduser, int idtrip);
}