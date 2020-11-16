package br.com.pi.goodtrip.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.pi.goodtrip.models.Viagem;

@Repository
public interface ViagemRepository extends JpaRepository<Viagem, Integer>{
	
	String selectByUserId = "SELECT * FROM viagens WHERE fk_id_usuario = :usuario AND finalizada = :finalizada";
	
	@Query(value = selectByUserId, nativeQuery = true)
	List<Viagem> selectTravelsByUserIdWhereFinalised(int usuario, Boolean finalizada);
}