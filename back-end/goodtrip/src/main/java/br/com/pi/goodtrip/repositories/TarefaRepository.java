package br.com.pi.goodtrip.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.pi.goodtrip.models.Tarefa;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Integer>{
	
	String selectByTravelId = "SELECT * FROM tarefas WHERE fk_id_viagem = :viagem AND finalizada = :finalizada";
	
	String selectByDateAndTravelId = "SELECT * FROM tarefas WHERE data LIKE %:data% AND fk_id_viagem=:idviagem";
	
	String deleteTaskById = "DELETE FROM tarefas WHERE id=:id";
	
	@Modifying
	@Transactional
	@Query(value = deleteTaskById, nativeQuery = true)
	void deleteTaskById(int id);
	
	@Query(value = selectByTravelId, nativeQuery = true)
	List<Tarefa> selectTasksByTravelIdWhereFinalised(int viagem, Boolean finalizada);
	
	@Query(value = selectByDateAndTravelId, nativeQuery = true)
	List<Tarefa> selectTasksByDateAndTravelID(String data, int idviagem);
	
}