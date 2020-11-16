package br.com.pi.goodtrip.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.pi.goodtrip.models.Tarefa;
import br.com.pi.goodtrip.services.TarefaService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("tarefas")
public class TarefaController {
	
	@Autowired
	private TarefaService tarefaService;
	
	@GetMapping("ler/{id}")
	public Tarefa lerViagem(@PathVariable(value = "id") int id){
		return tarefaService.readTaskById(id);
	}
	
	@GetMapping("viagem/ler")
	public List<Tarefa> lerTarefasDeViagem(@RequestParam int id_viagem,  Boolean finalizada){
		return tarefaService.readTasksBelongToTravelWhereFinalised(id_viagem, finalizada);
	}
	
	@GetMapping("/buscar")
	public List<Tarefa> getByData(@RequestParam String data, int idviagem) {
		return tarefaService.readTasksByTravelIdAndDate(data, idviagem);
	}
	
	@PostMapping("escrever")
	public Tarefa escreverTarefa(@RequestBody Tarefa tarefa) {
		return tarefaService.writeATask(tarefa);
	}
	
	@PutMapping("/editar/{id}")
	public Tarefa editarTarefa(@PathVariable int id, @RequestBody Tarefa data){
		return tarefaService.editTask(id, data);
	}
	
	@DeleteMapping("apagar")
	public Tarefa deletarTarefa(@RequestParam int id) {
		return tarefaService.deleteAnTaskById(id);
	}
}