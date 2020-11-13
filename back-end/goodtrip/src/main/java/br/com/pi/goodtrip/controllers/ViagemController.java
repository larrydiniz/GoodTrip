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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/*import br.com.pi.goodtrip.controllers.bodies.ViagemBody;
import br.com.pi.goodtrip.models.Usuario;*/
import br.com.pi.goodtrip.models.Viagem;
//import br.com.pi.goodtrip.repositories.UsuarioRepository;
import br.com.pi.goodtrip.repositories.ViagemRepository;
import br.com.pi.goodtrip.services.ViagemService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("viagens")
public class ViagemController {
	
	@Autowired
	private ViagemService viagemService;
	
	@GetMapping("ler/{id}")
	public Viagem lerViagem(@PathVariable(value = "id") int id){
		return viagemService.readATravelById(id);
	}
	
	@GetMapping("usuario/ler")
	public List<Viagem> lerViagensDeUsuario(@RequestParam int id_usuario, Boolean finalizada){
		return viagemService.readTravelsBelongToUser(id_usuario, finalizada);
	}
	
	@PostMapping("escrever")
	public Viagem escreverViagem(@RequestBody Viagem viagem){
		return viagemService.writeAnTravel(viagem);
	}
	
	@PutMapping("/editar/{id}")
	public Viagem editarViagem(@PathVariable int id, @RequestBody Viagem dados){
		return viagemService.editATravel(id, dados);
	}
}