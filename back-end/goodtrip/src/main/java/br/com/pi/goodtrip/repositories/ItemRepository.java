package br.com.pi.goodtrip.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.pi.goodtrip.models.Item;

@Repository
public interface ItemRepository extends CrudRepository<Item, Integer>{
	
	String query = "DELETE FROM itens WHERE id=:id"; 
	@Query(value = query, nativeQuery = true)
	void apagarItem(int id);
	
}