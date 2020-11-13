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

	public Tarefa readTaskById(int id) throws NoSuchElementException{
		return tarefaRepo.findById(id)
						 .orElseThrow(() -> new NoSuchElementException("Tarefa não encontrada"));
	}
	
	public List<Tarefa> readTasksBelongToTravelWhereFinalised(int travel,  Boolean finalised) throws NoSuchElementException{
		List<Tarefa> tasks = tarefaRepo.selectTasksByTravelIdWhereFinalised(travel, finalised);
		
		return Optional.of(tasks)
					   .filter(list -> !list.isEmpty())
					   .orElseThrow(() -> new NoSuchElementException("Tarefa de viagem não encontrada"));
	}
	
	public List<Tarefa> readTasksByTravelIdAndDate(String date, int travel) throws NoSuchElementException, IllegalArgumentException{
		String verifiedDate = 
			Optional.of(date)
					.filter(d -> !d.isBlank())
					.filter(d -> !(d.length() < 1))
					.orElseThrow(() -> new IllegalArgumentException("Data não recebida"));
		
		List<Tarefa> tasks = tarefaRepo.selectTasksByDateAndTravelID(verifiedDate, travel);
				
		return Optional.of(tasks)
				       .filter(list -> !list.isEmpty())
				       .orElseThrow(() -> new NoSuchElementException("Tarefas do dia de viagem não encontradas"));
	}
	
	public Tarefa writeATask(Tarefa data) throws IllegalArgumentException{
		
		Optional.of(data.getTitulo())
				.filter(t -> !t.isBlank())
				.filter(t -> t.length() < 20)
				.orElseThrow(() -> new IllegalArgumentException("Título de Tarefa inválido"));
			
		Optional.of(data.getHorario())
				.filter(h -> !h.isBlank())
				.filter(h -> h.length() > 4)
				.filter(h -> h.length() < 8)
				.orElseThrow(() -> new IllegalArgumentException("Horário de Tarefa inválido"));

		Optional.of(data.getMoeda())
				.filter(m -> m > -1)
				.filter(m -> m < 4)
				.orElseThrow(() -> new IllegalArgumentException("Moeda de Tarefa inválida"));

		Optional.of(data.getTransporte())
				.filter(t -> t > -1)
				.filter(t -> t < 4)
				.orElseThrow(() -> new IllegalArgumentException("Tranporte de tarefa inválida"));
		
		return tarefaRepo.save(data);
	}
	
	public Tarefa editTask( int id, Tarefa data) throws IllegalArgumentException{
		Tarefa taskDB = 
			tarefaRepo.findById(id)
					  .orElseThrow(() -> new NoSuchElementException("Tarefa não encontrada"));
		
		String verifiedTitle = 
				Optional.of(data.getTitulo())
					.filter(t -> !t.isBlank())
					.filter(t -> t.length() < 20)
					.orElseThrow(() -> new IllegalArgumentException("Título de Tarefa inválido"));
		
		String verifiedHourly =
				Optional.of(data.getHorario())
					.filter(h -> !h.isBlank())
					.filter(h -> h.length() > 4)
					.filter(h -> h.length() < 8)
					.orElseThrow(() -> new IllegalArgumentException("Horário de Tarefa inválido"));
		
		int verifiedCurrency = 
				Optional.of(data.getMoeda())
					.filter(m -> m > -1)
					.filter(m -> m < 4)
					.orElseThrow(() -> new IllegalArgumentException("Moeda de Tarefa inválida"));
		
		int verifiedTransport = 
				Optional.of(data.getTransporte())
					.filter(t -> t > -1)
					.filter(t -> t < 4)
					.orElseThrow(() -> new IllegalArgumentException("Tranporte de tarefa inválida"));
		
		taskDB.setCusto(data.getCusto());
		taskDB.setDescricao(data.getDescricao());
		
		taskDB.setTitulo(verifiedTitle);
		taskDB.setHorario(verifiedHourly);
		taskDB.setMoeda(verifiedCurrency);
		taskDB.setTransporte(verifiedTransport);
		
		return tarefaRepo.save(taskDB);
	}
	
	public Tarefa deleteAnTaskById(int id) throws NoSuchElementException{
		Tarefa toDelete = 
				tarefaRepo.findById(id)
						  .orElseThrow(() -> new NoSuchElementException("Não é possível deletar uma Tarefa inexistentw"));
		
		tarefaRepo.deleteTaskById(id);
		
		return toDelete;
	}
}
