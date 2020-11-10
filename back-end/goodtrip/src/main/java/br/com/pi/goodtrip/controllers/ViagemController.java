package br.com.pi.goodtrip.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*import br.com.pi.goodtrip.controllers.bodies.ViagemBody;
import br.com.pi.goodtrip.models.Usuario;*/
import br.com.pi.goodtrip.models.Viagem;
//import br.com.pi.goodtrip.repositories.UsuarioRepository;
import br.com.pi.goodtrip.repositories.ViagemRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("viagens")
public class ViagemController {
	
	@Autowired
	private ViagemRepository viagemRepo;
	
/*	@Autowired
	private UsuarioRepository usuarioRepo;*/
	
	@GetMapping("ler/{id}")
	public Optional<Viagem> lerViagem(@PathVariable(value = "id") int id){
		return viagemRepo.findById(id);
	}
	
	@PostMapping("escrever")
	public Viagem escreverViagem(@RequestBody Viagem viagem) {
		viagemRepo.save(viagem);
		return viagem;
	}
	
	@DeleteMapping("apagar/{id}")
	public void deletarViagem(@PathVariable int id) {
		viagemRepo.deleteById(id);
	}
	
	@PutMapping("/editar/{id}")
	public Viagem editarViagem(@PathVariable int id, @RequestBody Viagem dados) throws Exception{
		Viagem viagemDB = viagemRepo.findById(id)
				.orElseThrow(() -> new IllegalAccessException());
		
		viagemDB.setDestino(dados.getDestino());
		viagemDB.setInicio(dados.getInicio());
		viagemDB.setTermino(dados.getTermino());
		viagemDB.setImagem(dados.getImagem());
		
		viagemRepo.save(viagemDB);
		
		return viagemDB;
	}
	
	
	
	/*@PostMapping("escrever")
	public void escreverViagem(@RequestBody ViagemBody body) {
		Usuario usuario = usuarioRepo.findById(body.getUsuarioId()).orElseThrow();
		viagemRepo.save(new Viagem(body, usuario));
	}*/
}