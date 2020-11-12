package br.com.pi.goodtrip.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.pi.goodtrip.models.Tarefa;
//import br.com.pi.goodtrip.models.Usuario;
//import br.com.pi.goodtrip.models.Viagem;
import br.com.pi.goodtrip.repositories.TarefaRepository;
//import br.com.pi.goodtrip.repositories.UsuarioRepository;
//import br.com.pi.goodtrip.repositories.ViagemRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("tarefas")
public class TarefaController {
	
	@Autowired
	private TarefaRepository tarefaRepo;
	
	/*@Autowired
	private ViagemRepository viagemRepo;
	
	@Autowired
	private UsuarioRepository usuarioRepo;*/
	
	@GetMapping("ler/{id}")
	public Optional<Tarefa> lerViagem(@PathVariable(value = "id") int id){
		return tarefaRepo.findById(id);
	}
	
	@GetMapping("viagem/ler")
	public List<Tarefa> lerTarefasDeViagem(@RequestParam int id_viagem,  Boolean finalizada){
		return tarefaRepo.encontrarTarefasPorIdViagem(id_viagem, finalizada);
	}
	
	@GetMapping("/buscar")
	public List<Tarefa> getByData(@RequestParam String data, int idviagem) {
		return tarefaRepo.encontrarTarefas(data, idviagem);
	}
	
	@PostMapping("escrever")
	public Tarefa escreverTarefa(@RequestBody Tarefa tarefa) {
		tarefaRepo.save(tarefa);
		return tarefa;
	}
	
	@PutMapping("/editar/{id}")
	public Tarefa editarTarefa(@PathVariable int id, @RequestBody Tarefa dadosTarefa) throws Exception{
		Tarefa taskDB = tarefaRepo.findById(id)
				.orElseThrow(() -> new IllegalAccessException());
		
		taskDB.setTitulo(dadosTarefa.getTitulo());
		taskDB.setDescricao(dadosTarefa.getDescricao());
		taskDB.setHorario(dadosTarefa.getHorario());
		taskDB.setCusto(dadosTarefa.getCusto());
		taskDB.setMoeda(dadosTarefa.getMoeda());
		taskDB.setTransporte(dadosTarefa.getTransporte());
		
		tarefaRepo.save(taskDB);
		
		return taskDB;
	}

}