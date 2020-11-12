package br.com.pi.goodtrip.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.pi.goodtrip.models.Tarefa;

@Repository
public interface TarefaRepository extends CrudRepository<Tarefa, Integer>{
	
	String selectByTravelId = "SELECT * FROM tarefas WHERE fk_id_viagem = ?1 AND finalizada = ?2";
	
	String query = "SELECT * FROM tarefas WHERE data LIKE %:data% AND fk_id_viagem=:idviagem";
	
	@Query(value = selectByTravelId, nativeQuery = true)
	List<Tarefa> encontrarTarefasPorIdViagem(int viagem, Boolean finalizada);
	
	@Query(value = query, nativeQuery = true)
	List<Tarefa> encontrarTarefas(String data, int idviagem);
}