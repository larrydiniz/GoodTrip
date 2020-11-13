package br.com.pi.goodtrip.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.pi.goodtrip.models.Tarefa;
import br.com.pi.goodtrip.repositories.TarefaRepository;

@Service
public class TarefaService {
	@Autowired
	private TarefaRepository tarefaRepo;

	public Tarefa readTaskById(int id){
		return tarefaRepo.findById(id)
						 .orElseThrow(() -> new NoSuchElementException("Tarefa não encontrada"));
	}
	
	public List<Tarefa> readTasksBelongToTravelWhereFinalised(int travel,  Boolean finalised){
		return tarefaRepo.selectTasksByTravelIdWhereFinalised(travel, finalised)
						 .orElseThrow(() -> new NoSuchElementException("Tarefa de viagem não encontrada"));
	}
	
	public List<Tarefa> readTasksByTravelIdAndDate(String date, int travel) {
		String verifiedDate = 
			Optional.of(date)
					.map(d -> d.isBlank()? null: d)
					.map(d -> d.length() < 1? null: d)
					.orElseThrow(() -> new IllegalArgumentException("Data não recebida"));
		
		return tarefaRepo.selectTasksByDateAndTravelID(verifiedDate, travel)
						 .orElseThrow(() -> new NoSuchElementException("Tarefas do dia de viagem não encontradas"));
	}
	
	public Tarefa writeATask(Tarefa data) {
		
		Optional.of(data.getTitulo())
				.map(t -> t.isBlank()? null: t)
				.map(t -> t.length() > 20? null: t)
				.orElseThrow(() -> new IllegalArgumentException("Título de Tarefa inválido"));
			
		Optional.of(data.getHorario())
				.map(h -> h.isBlank()? null: h)
				.map(h -> h.length() > 6? null: h)
				.orElseThrow(() -> new IllegalArgumentException("Horário de Tarefa inválido"));

		Optional.of(data.getMoeda())
				.map(m -> m < 0? null: m)
				.map(m -> m > 3? null: m)
				.orElseThrow(() -> new IllegalArgumentException("Moeda de Tarefa inválida"));

		Optional.of(data.getTransporte())
				.map(t -> t < 0? null: t)
				.map(t -> t > 3? null: t)
				.orElseThrow(() -> new IllegalArgumentException("Tranporte de tarefa inválida"));
		
		return tarefaRepo.save(data);
	}
	
	public Tarefa editTask( int id, Tarefa data){
		Tarefa taskDB = 
			tarefaRepo.findById(id)
					  .orElseThrow(() -> new NoSuchElementException("Tarefa não encontrada"));
		
		String verifiedTitle = 
			Optional.of(data.getTitulo())
					.map(t -> t.isBlank()? null: t)
					.map(t -> t.length() > 20? null: t)
					.orElseThrow(() -> new IllegalArgumentException("Título de tarefa inválido"));
		
		String verifiedHourly =
			Optional.of(data.getHorario())
					.map(h -> h.isBlank()? null: h)
					.map(h -> h.length() > 6? null: h)
					.orElseThrow(() -> new IllegalArgumentException("Horário de tarefa inválido"));
		
		int verifiedCurrency = 
			Optional.of(data.getMoeda())
					.map(m -> m < 0? null: m)
					.map(m -> m > 3? null: m)
					.orElseThrow(() -> new IllegalArgumentException("Moeda de tarefa inválida"));
		
		int verifiedTransport = 
			Optional.of(data.getTransporte())
					.map(t -> t < 0? null: t)
					.map(t -> t > 3? null: t)
					.orElseThrow(() -> new IllegalArgumentException("Transporte de tarefa inválido"));
		
		taskDB.setCusto(data.getCusto());
		taskDB.setDescricao(data.getDescricao());
		
		taskDB.setTitulo(verifiedTitle);
		taskDB.setHorario(verifiedHourly);
		taskDB.setMoeda(verifiedCurrency);
		taskDB.setTransporte(verifiedTransport);
		
		return tarefaRepo.save(taskDB);
	}
	
	public Tarefa deleteAnTaskById(int id) {
		Tarefa toDelete = 
				tarefaRepo.findById(id)
						  .orElseThrow(() -> new NoSuchElementException("Não é possível deletar uma Tarefa inexistentw"));
		
		tarefaRepo.deleteTaskById(id);
		
		return toDelete;
	}
}
