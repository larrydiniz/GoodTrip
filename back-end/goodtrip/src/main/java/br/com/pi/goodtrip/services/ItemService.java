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
	
	private Optional<String> hasValidName(Item item) {
		return Optional.ofNullable(item.getNome())
				       .filter(n -> !n.isBlank())
				       .filter(n -> n.length() > 2);
	}
	
	private Optional<Integer> hasValidCategory(Item item){
		return Optional.ofNullable(item.getCategoria())
				       .filter(c -> c > -1)
				       .filter(c -> c < 4);
	}
	
	public Item editItem(int id, Item newItem) throws NoSuchElementException, IllegalArgumentException{
		
		Item toUpdate = 
				itemRepo.findById(id)
						.orElseThrow(() -> new NoSuchElementException("Item não encontrado"));
		
		toUpdate.setChecado(newItem.getChecado());
		
		return itemRepo.save(toUpdate);
	}
	
	public List<Item> readByCategoryAndTravelId(int travel, int category) throws NoSuchElementException, IllegalArgumentException{
		int verifiedCategory =
				Optional.of(category)
						.filter(c -> c > -1)
						.filter(c -> c < 4)
						.orElseThrow(() -> new IllegalArgumentException("Categoria inexistente"));
		
		List<Item> itens = itemRepo.readItensByCategoryAndTravelId(travel, verifiedCategory);
		
		return itens;
	}
	
	public List<Item> readAllByTravel(int travel){
		
		List<Item> itens = itemRepo.readItensByTravelId(travel);
		
		return itens;
	}
	
	public Item deleteItemById(int id) throws NoSuchElementException{
		Item toDelete =
				itemRepo.findById(id)
				        .orElseThrow(() -> new NoSuchElementException("Não é possível deletar um item inexistente"));
		
		itemRepo.deleteItemById(id);
		
		return toDelete;
	}
	
	public Item writeAnItem(Item item) throws NoSuchElementException, IllegalArgumentException{
		
		hasValidName(item)
				.orElseThrow(() -> new IllegalArgumentException("Nome inválido"));
						
		hasValidCategory(item)
				.orElseThrow(() -> new IllegalArgumentException("Categoria inexistente"));
		
		return itemRepo.save(item);
	}
	
	public Item readById(int id) {
		Item foundItem = 
			  itemRepo.findById(id)
					  .orElseThrow(() -> new NoSuchElementException("Item não encontrado"));
		
		return foundItem;
	}
}
