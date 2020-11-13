package br.com.pi.goodtrip.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.pi.goodtrip.models.Embarque;
import br.com.pi.goodtrip.repositories.EmbarqueRepository;

@Service
public class EmbarqueService {
	@Autowired
	private EmbarqueRepository embarqueRepo;
	
	public Embarque readAInvitationById(int id){
			return embarqueRepo.findById(id)
					           .orElseThrow(() -> new NoSuchElementException("Embarque não encontrado"));
	}
	
	public List<Embarque> readAllByIdWhereAccepted(int usuario, Boolean aceito){
		
		return embarqueRepo.selectInvitationsByUserId(usuario, aceito);
	}
	
	public List<Embarque> readAllByTravelIdWhereFinalised(int travel, Boolean isFinalised){

		List<Embarque> response = embarqueRepo.selectInvitationsByTravelId(travel, isFinalised);
				
		Optional.of(response)
				.map(list -> list.isEmpty()? null: list)
				.orElseThrow(() -> new NoSuchElementException());
		
		return response;
	}
	
	public Embarque writeAnInvitation(Embarque embarque) {
		
		int userId = embarque.getUsuario().getId();
		int travelId = embarque.getViagem().getId();
		
		List<Embarque> list = embarqueRepo.selectInvitationByUserIdAndTravelId(userId, travelId);
		
		Optional.of(list)
				.map(l -> l.isEmpty() ? l.add(embarque): null)
				.orElseThrow(() -> new IllegalArgumentException());
		
		return embarqueRepo.save(embarque);
	}
	
	public Embarque acceptOrNotAnInvitation(int id, Embarque resposta){
		Boolean newAceito = resposta.getAceito();
		
		Embarque embarcar = 
				embarqueRepo.findById(id)
							.map(embarque -> embarque.setAceitoThenReturnSelf(newAceito))
							.orElseThrow(() -> new NoSuchElementException("Embarque não encontrado, impossível aceitar"));

		
		return embarqueRepo.save(embarcar);
	}
	
	public Embarque deleteInvitationById(int id) {
		Embarque toDelete = 
				embarqueRepo.findById(id)
							.orElseThrow(() -> new NoSuchElementException());
		
		embarqueRepo.deleteInvitationById(id);
		
		return toDelete;
	}
}
