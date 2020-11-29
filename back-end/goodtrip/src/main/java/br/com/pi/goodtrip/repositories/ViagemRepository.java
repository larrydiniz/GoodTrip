package br.com.pi.goodtrip.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.pi.goodtrip.models.Viagem;

@Repository
public interface ViagemRepository extends JpaRepository<Viagem, Integer>{
	
	String selectByUserIdAndFinalised = "SELECT * FROM viagens WHERE fk_id_usuario = :usuario AND finalizada = :finalizada AND apagada IS NULL";
	
	@Query(value = selectByUserIdAndFinalised, nativeQuery = true)
	List<Viagem> selectTravelsByUserIdWhereFinalised(int usuario, Boolean finalizada);
	
	String selectTripByLocalName = "SELECT * FROM viagens WHERE destino LIKE %:q% AND fk_id_usuario = :usuario AND apagada IS NULL";
	
	@Query(value = selectTripByLocalName, nativeQuery = true)
	List<Viagem> selectTripByLocalName(String q, int usuario);
	
	String selectTripByLocalNameBeingMember = "	SELECT * FROM viagens AS v INNER JOIN embarques AS e ON v.id = e.fk_id_viagem"
			+ "	WHERE destino LIKE %:q% AND e.fk_id_usuario = :usuario AND apagada IS NULL";

	@Query(value = selectTripByLocalNameBeingMember, nativeQuery = true)
	List<Viagem> selectTripByLocalNameBeingMember(String q, int usuario);
}