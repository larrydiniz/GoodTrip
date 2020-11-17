package br.com.pi.goodtrip.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.pi.goodtrip.models.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer>{
	
	String deleteItenById = "DELETE FROM itens WHERE id=:id";
	
	String selectItensByCategoryAndTravelId = "SELECT * FROM itens WHERE categoria=:category AND fk_id_viagem=:travel ";
	
	@Modifying
	@Transactional
	@Query(value = deleteItenById, nativeQuery = true)
	void deleteItemById(int id);
	
	@Query(value = selectItensByCategoryAndTravelId, nativeQuery = true)
	List<Item> readItensByCategoryAndTravelId(int travel, int category);
	
}