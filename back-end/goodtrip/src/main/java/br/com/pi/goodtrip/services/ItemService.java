package br.com.pi.goodtrip.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.pi.goodtrip.models.Item;
import br.com.pi.goodtrip.repositories.ItemRepository;

@Service
public class ItemService {
	
	@Autowired
	private ItemRepository itemRepo;
	
	public Item editItem(int id, Item newItem) {
		String newName = 
				Optional.of(newItem.getNome())
						.map(n -> n.isBlank()? null: n)
						.map(n -> n.length() < 3? null: n)
						.orElseThrow(() -> new IllegalArgumentException("Nome de item não pode ser vazio"));
		
		Item itemDB = 
				itemRepo.findById(id)
						.map(item -> item.setNomeThenReturnSelf(newName))
						.orElseThrow(() -> new NoSuchElementException("Item não encontrado"));
		
		return itemRepo.save(itemDB);
	}
	
	public List<Item> readByCategoryAndTravelId(int travel, int category) {
		int verifiedCategory =
				Optional.of(category)
						.map(c -> c < 0? null: c)
						.map(c -> c > 4? null: c)
						.orElseThrow(() -> new IllegalArgumentException("Categoria inexistente"));
		
		List<Item> itens = itemRepo.readItensByCategoryAndTravelId(travel, verifiedCategory);
		
		return Optional.of(itens)
					   .map(list -> list.isEmpty()? null: list)
					   .orElseThrow(() -> new NoSuchElementException("Itens de viagem não encontrados"));
	}
	
	public Item deleteItemById(int id) {
		Item toDelete =
				itemRepo.findById(id)
				        .orElseThrow(() -> new NoSuchElementException("Não é possível deletar um item inexistente"));
		
		itemRepo.deleteItemById(id);
		
		return toDelete;
	}
	
	public Item writeAnItem(Item item) {
		Optional.of(item.getNome())
				.map(n -> n.isBlank()? null: n)
				.map(n -> n.length() > 20? null: n)
				.orElseThrow(() -> new IllegalArgumentException("Nome inválido"));
						
		Optional.of(item.getCategoria())
				.map(c -> c > 4? null: c)
				.map(c -> c < 0? null: c)
				.orElseThrow(() -> new IllegalArgumentException("Categoria de item inexistente"));
		
		return itemRepo.save(item);
	}
	
	public Item readById(int id) {
		return itemRepo.findById(id)
					  .orElseThrow(() -> new NoSuchElementException("Item não encontrado"));
	}
}
