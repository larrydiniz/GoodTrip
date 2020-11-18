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
	
	public Embarque readAInvitationById(int id) throws NoSuchElementException{
			Embarque found = 
					  embarqueRepo.findById(id)
					           .orElseThrow(() -> new NoSuchElementException("Embarque não encontrado"));
			
			return found;
	}
	
	public List<Embarque> readAllByIdWhereAccepted(int usuario, Boolean aceito) throws NoSuchElementException{
		
		List<Embarque> userInvitations = embarqueRepo.selectInvitationsByUserId(usuario, aceito);
		
		List<Embarque> verifiedUserInvitations =
						Optional.of(userInvitations)
							    .orElseThrow(() -> new NoSuchElementException("Embarques de usuário não encontrados"));
		
		return verifiedUserInvitations;
	}
	
	public List<Embarque> readAllByTravelIdWhereFinalised(int travel, Boolean isFinalised) throws NoSuchElementException{

		List<Embarque> travelInvitations = embarqueRepo.selectInvitationsByTravelId(travel, isFinalised);
		
		List<Embarque> verifiedTravelInvitations =
						Optional.of(travelInvitations)
								.orElseThrow(() -> new NoSuchElementException("Embarques de viagem não encontrados"));
		
		return verifiedTravelInvitations;
	}
	
	public Embarque writeAnInvitation(Embarque embarque) throws IllegalArgumentException{
		
		int userId = embarque.getUsuario().getId();
		int travelId = embarque.getViagem().getId();
		
		Optional.of(userId)
		        .filter(u -> u != embarque.getAutor().getId())
		        .orElseThrow(() -> new IllegalArgumentException("Não é possível convidar a si mesmo"));
		
		Optional<Embarque> invite = embarqueRepo.selectInvitationByUserIdAndTravelId(userId, travelId)
								   .stream()
								   .findFirst();
		
		if(invite.isEmpty()) {
			
			return embarqueRepo.save(embarque);
		}
		else {
			
			throw new IllegalArgumentException("Embarque já existe");
		}
	}
	
	public Embarque acceptOrNotAnInvitation(int id, Embarque resposta) throws NoSuchElementException{
		Boolean newAceito = resposta.getAceito();
		
		Embarque toUpdate = 
				  embarqueRepo.findById(id)
							  .map(embarque -> embarque.setAceitoThenReturnSelf(newAceito))
							  .orElseThrow(() -> new NoSuchElementException("Embarque não encontrado, impossível aceitar"));

		
		return embarqueRepo.save(toUpdate);
	}
	
	public Embarque deleteInvitationById(int id) throws NoSuchElementException{
		Embarque toDelete = 
				  embarqueRepo.findById(id)
							  .orElseThrow(() -> new NoSuchElementException("Não foi possível deletar embarque"));
		
		embarqueRepo.deleteInvitationById(id);
		
		return toDelete;
	}
}
