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

import br.com.pi.goodtrip.models.Item;
import br.com.pi.goodtrip.services.ItemService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("itens")
public class ItemController {
	
	@Autowired
	private ItemService itemService;
	
	@GetMapping("ler/{id}")
	public Item lerItem(@PathVariable(value = "id") int id){
		return itemService.readById(id);
	}
	
	@GetMapping("/viagem/ler")
	public List<Item> lerItensDeCategoriaEViagem(@RequestParam int viagem, int categoria){
		return itemService.readByCategoryAndTravelId(viagem, categoria);
	}
	
	@PostMapping("escrever")
	public Item escreverItem(@RequestBody Item item) {
		return itemService.writeAnItem(item);
	}
	
	@DeleteMapping("apagar")
	public Item deletarItem(@RequestParam int id) {
		return itemService.deleteItemById(id);
	}
	
	@PutMapping("/editar/{id}")
	public Item editarItem(@PathVariable int id, @RequestBody Item dadosItem) {
		return itemService.editItem(id, dadosItem);
	}
}