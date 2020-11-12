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

import br.com.pi.goodtrip.models.Embarque;
//import br.com.pi.goodtrip.models.Usuario;
//import br.com.pi.goodtrip.models.Viagem;
import br.com.pi.goodtrip.repositories.EmbarqueRepository;
//import br.com.pi.goodtrip.repositories.UsuarioRepository;
//import br.com.pi.goodtrip.repositories.ViagemRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("embarques")
public class EmbarqueController {
	
	@Autowired
	private EmbarqueRepository embarqueRepo;
	
	/*@Autowired
	private UsuarioRepository usuarioRepo;
	
	@Autowired
	private ViagemRepository viagemRepo;*/
	
	@GetMapping("ler/{id}")
	public Optional<Embarque> lerConvite(@PathVariable(value = "id") int id){
		return embarqueRepo.findById(id);
	}
	
	@GetMapping("ler/todos")
	public List<Embarque> lerTodosEmbarquesPeloIdUsuario(@RequestParam(value="id_usuario") String id, @RequestParam(value="aceito") Boolean aceito){
		return embarqueRepo.encontrarEmbarquesDeUsuario(id, aceito);
	}
	
	@PostMapping("escrever")
	public Embarque novoEmbarque(@RequestBody Embarque embarque) {

		if(embarqueRepo.encontrarEmbarque((embarque.getUsuario().getId()),
			(embarque.getViagem().getId())).isEmpty()) {

				embarqueRepo.save(embarque);
				return embarque;
		}
		
		return Erro();
	}
	
	private Embarque Erro() {
		return null;
	}

	@PutMapping("aceitar/{id}")
	public Embarque responderEmbarque(@PathVariable int id, @RequestBody Embarque resposta) throws Exception{
		Embarque embarcar = embarqueRepo.findById(id)
				.orElseThrow(() -> new IllegalAccessException());
		
		embarcar.setAceito(resposta.getAceito());
		
		embarqueRepo.save(embarcar);
		
		return resposta;
	}
		
}