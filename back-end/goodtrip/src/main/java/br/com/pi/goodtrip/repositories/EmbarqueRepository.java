package br.com.pi.goodtrip.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.pi.goodtrip.models.Embarque;

@Repository
public interface EmbarqueRepository extends JpaRepository<Embarque, Integer>{
	
	String selectByTravelId = "SELECT * FROM embarques WHERE fk_id_viagem=:viagem AND finalizada=:finalizada";
	
	String selectByUserId = "SELECT * FROM embarques WHERE fk_id_usuario=:usuario AND aceito=:aceito";
	
	String deleteById = "DELETE FROM embarques WHERE id=:id";
	
	String selectByUserIdAndTravelId = "SELECT * FROM embarques WHERE fk_id_usuario=:iduser AND fk_id_viagem=:idtrip";
	
	@Modifying
	@Transactional
	@Query(value = deleteById, nativeQuery = true)
	void deleteInvitationById(int id);
	
	@Query(value = selectByTravelId, nativeQuery = true)
	List<Embarque> selectInvitationsByTravelId(int viagem, Boolean finalizada);
	
	@Query(value = selectByUserId, nativeQuery = true)
	List<Embarque> selectInvitationsByUserId(int usuario, Boolean aceito);
	
	@Query(value = selectByUserIdAndTravelId, nativeQuery = true)
	List<Embarque> selectInvitationByUserIdAndTravelId(int iduser, int idtrip);
}