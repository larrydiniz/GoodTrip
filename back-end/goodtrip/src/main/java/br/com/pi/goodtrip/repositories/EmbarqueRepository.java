package br.com.pi.goodtrip.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import br.com.pi.goodtrip.models.Embarque;

@Repository
public interface EmbarqueRepository extends CrudRepository <Embarque, Integer>{}