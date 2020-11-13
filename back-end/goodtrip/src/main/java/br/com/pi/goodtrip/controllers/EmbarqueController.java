package br.com.pi.goodtrip.controllers;

import java.util.List;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.pi.goodtrip.models.Embarque;
import br.com.pi.goodtrip.services.EmbarqueService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("embarques")
public class EmbarqueController {
	
	@Autowired
	private EmbarqueService embarqueService;
	
	@GetMapping("ler/{id}")
	public Embarque lerConvite(@PathVariable(value = "id") int id){
			return embarqueService.readAInvitationById(id);
	}
	
	@GetMapping("usuario/ler")
	public List<Embarque> lerTodosEmbarquesPeloIdUsuario(@RequestParam int id_usuario, Boolean aceito){
		return embarqueService.readAllByIdWhereAccepted(id_usuario, aceito);
	}
	
	@GetMapping("viagem/ler")
	public List<Embarque> lerTodosEmbarquesPeloIdViagem(@RequestParam int id_viagem, Boolean finalizada){
		return embarqueService.readAllByTravelIdWhereFinalised(id_viagem, finalizada);
	}
	
	@PostMapping("escrever")
	public Embarque novoEmbarque(@RequestBody Embarque embarque) {
		return embarqueService.writeAnInvitation(embarque);
	}
	
	@PutMapping("aceitar/{id}")
	public Embarque responderEmbarque(@PathVariable int id, @RequestBody Embarque resposta){
		return embarqueService.acceptOrNotAnInvitation(id, resposta);
	}
	
	@DeleteMapping("apagar")
	public Embarque deletarItem(@RequestParam int id) {
        return embarqueService.deleteInvitationById(id);
	}	
}