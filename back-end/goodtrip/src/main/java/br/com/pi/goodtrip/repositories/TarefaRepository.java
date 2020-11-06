package br.com.pi.goodtrip.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.pi.goodtrip.models.Tarefa;

@Repository
public interface TarefaRepository extends CrudRepository<Tarefa, Integer>{}