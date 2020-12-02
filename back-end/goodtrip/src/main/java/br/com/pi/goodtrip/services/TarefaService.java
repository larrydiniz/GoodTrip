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
	
	private Optional<String> hasValidTitle(Tarefa task){
		return Optional.ofNullable(task.getTitulo())
				       .filter(t -> !t.isBlank())
				       .filter(t -> t.length() < 50);
	}
	
	private Optional<String> hasValidHourly(Tarefa task){
		return Optional.ofNullable(task.getHorario())
				       .filter(h -> !h.isBlank())
				       .filter(h -> h.length() > 4)
				       .filter(h -> h.length() < 8);
	}
	
	private Optional<Integer> hasValidCurrency(Tarefa task){
		return Optional.ofNullable(task.getMoeda())
				       .filter(m -> m > -1)
				       .filter(m -> m < 4);
	}
	
	private Optional<Integer> hasValidTransport(Tarefa task){
		return Optional.ofNullable(task.getTransporte())
				       .filter(t -> t > -1)
				       .filter(t -> t < 4);
	}

	public Tarefa readTaskById(int id) throws NoSuchElementException{
		Tarefa foundTask = 
				tarefaRepo.findById(id)
						  .orElseThrow(() -> new NoSuchElementException("Tarefa não encontrada"));
		
		return foundTask;
	}
	
	public List<Tarefa> readTasksBelongToTravelWhereFinalised(int travel,  Boolean finalised) throws NoSuchElementException{
		List<Tarefa> tasks = tarefaRepo.selectTasksByTravelIdWhereFinalised(travel, finalised);
		
		List<Tarefa> verifiedList =
		              Optional.of(tasks)
					          .filter(list -> !list.isEmpty())
					          .orElseThrow(() -> new NoSuchElementException("Tarefa de viagem não encontrada"));
		
		return verifiedList;
	}
	
	public List<Tarefa> readTasksByTravelIdAndDate(String date, int travel) throws NoSuchElementException, IllegalArgumentException{
		String verifiedDate = 
			    Optional.of(date)
					    .filter(d -> !d.isBlank())
					    .filter(d -> !(d.length() < 1))
					    .orElseThrow(() -> new IllegalArgumentException("Data não recebida"));
		 
		List<Tarefa> tasks = tarefaRepo.selectTasksByDateAndTravelID(verifiedDate, travel);
		
		List<Tarefa> verifiedList =
					  Optional.of(tasks)
				              .filter(list -> !list.isEmpty())
				              .orElseThrow(() -> new NoSuchElementException("Tarefas do dia de viagem não encontradas"));
		
		return verifiedList;
	}
	
	public Tarefa writeATask(Tarefa data) throws IllegalArgumentException{
		
		String exceptionContext = "Tarefa não pôde ser salva..";
		
		hasValidTitle(data).orElseThrow(() -> new IllegalArgumentException("Título de Tarefa inválido: " + exceptionContext));
			
		hasValidHourly(data).orElseThrow(() -> new IllegalArgumentException("Horário de Tarefa inválido: " + exceptionContext));

		hasValidCurrency(data).orElseThrow(() -> new IllegalArgumentException("Moeda de Tarefa inválida: " + exceptionContext));

		hasValidCurrency(data).orElseThrow(() -> new IllegalArgumentException("Tranporte de tarefa inválida: " + exceptionContext));
		
		return tarefaRepo.save(data);
	}
	
	public Tarefa editTask(int id, Tarefa data) throws IllegalArgumentException{
		
		String exceptionContext = "Não foi possível editar Tarefa...";
		
		Tarefa toUpdate = 
			    tarefaRepo.findById(id)
					      .orElseThrow(() -> new NoSuchElementException("Tarefa não encontrada"));
		
		String verifiedTitle = 
				hasValidTitle(data)
				     .orElseThrow(() -> new IllegalArgumentException("Título de Tarefa inválido: " + exceptionContext));
		
		String verifiedHourly =
				hasValidHourly(data)
					.orElseThrow(() -> new IllegalArgumentException("Horário de Tarefa inválido: " + exceptionContext));
		
		int verifiedCurrency = 
			 hasValidCurrency(data)
					.orElseThrow(() -> new IllegalArgumentException("Moeda de Tarefa inválida" + exceptionContext));
		
		int verifiedTransport = 
			 hasValidTransport(data)
					.orElseThrow(() -> new IllegalArgumentException("Tranporte de tarefa inválida" + exceptionContext));
		
		toUpdate.setTitulo(verifiedTitle);
		toUpdate.setHorario(verifiedHourly);
		toUpdate.setMoeda(verifiedCurrency);
		toUpdate.setTransporte(verifiedTransport);
		
		toUpdate.setCusto(data.getCusto());
		toUpdate.setDescricao(data.getDescricao());
		
		return tarefaRepo.save(toUpdate);
	}
	
	public Tarefa deleteAnTaskById(int id) throws NoSuchElementException{
		Tarefa toDelete = 
				tarefaRepo.findById(id)
						  .orElseThrow(() -> new NoSuchElementException("Não é possível deletar uma Tarefa inexistente"));
		
		tarefaRepo.deleteTaskById(id);
		
		return toDelete;
	}
}
