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

//import br.com.pi.goodtrip.controllers.bodies.ItemBody;
import br.com.pi.goodtrip.models.Item;
//import br.com.pi.goodtrip.models.Usuario;
//import br.com.pi.goodtrip.models.Viagem;
import br.com.pi.goodtrip.repositories.ItemRepository;
//import br.com.pi.goodtrip.repositories.UsuarioRepository;
//import br.com.pi.goodtrip.repositories.ViagemRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("itens")
public class ItemController {
	
	@Autowired
	private ItemRepository itemRepo;
	
/*	@Autowired
	private ViagemRepository viagemRepo;
	
	@Autowired
	private UsuarioRepository usuarioRepo; */
	
	@GetMapping("ler/{id}")
	public Optional<Item> lerItem(@PathVariable(value = "id") int id){
		
		return itemRepo.findById(id);
	}
	
	@PostMapping("escrever")
	public Item escreverItem(@RequestBody Item item) {
		itemRepo.save(item);
		return item;
	}
	
	@DeleteMapping("apagar/{id}")
	public void deletarItem(@PathVariable int id) {
		itemRepo.deleteById(id);
	}
	
	@PutMapping("/editar/{id}")
	public Item editarItem(@PathVariable int id, @RequestBody Item dadosItem) throws Exception{
		Item itemDB = itemRepo.findById(id)
				.orElseThrow(() -> new IllegalAccessException());
		
		itemDB.setNome(dadosItem.getNome());;
		
		itemRepo.save(itemDB);
		
		return itemDB;
	}
	
	/*@PostMapping("escrever")
	public void escreverViagem(@RequestBody ItemBody body) {
		
		Usuario usuario = usuarioRepo.findById(body.getUsuarioId()).orElseThrow();
		Viagem viagem = viagemRepo.findById(body.getViagemId()).orElseThrow();
		
		itemRepo.save(new Item(body, usuario, viagem));
	}*/
}