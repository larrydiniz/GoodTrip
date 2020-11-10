package br.com.pi.goodtrip.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
	@PostMapping("escrever")
	public Tarefa escreverTarefa(@RequestBody Tarefa tarefa) {
		tarefaRepo.save(tarefa);
		return tarefa;
	}

}