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
			return embarqueRepo.findById(id)
					           .orElseThrow(() -> new NoSuchElementException("Embarque não encontrado"));
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
		
		List<Embarque> list = embarqueRepo.selectInvitationByUserIdAndTravelId(userId, travelId);
		
		Optional.of(list)
				.filter(l -> l.isEmpty())
				.orElseThrow(() -> new IllegalArgumentException("Embarque já existe"));
		
		return embarqueRepo.save(embarque);
	}
	
	public Embarque acceptOrNotAnInvitation(int id, Embarque resposta) throws NoSuchElementException{
		Boolean newAceito = resposta.getAceito();
		
		Embarque embarcar = 
				embarqueRepo.findById(id)
							.map(embarque -> embarque.setAceitoThenReturnSelf(newAceito))
							.orElseThrow(() -> new NoSuchElementException("Embarque não encontrado, impossível aceitar"));

		
		return embarqueRepo.save(embarcar);
	}
	
	public Embarque deleteInvitationById(int id) throws NoSuchElementException{
		Embarque toDelete = 
				embarqueRepo.findById(id)
							.orElseThrow(() -> new NoSuchElementException("Não foi possível deletar embarque"));
		
		embarqueRepo.deleteInvitationById(id);
		
		return toDelete;
	}
}
