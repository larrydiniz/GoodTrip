package br.com.pi.goodtrip.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.pi.goodtrip.models.Viagem;
import br.com.pi.goodtrip.repositories.ViagemRepository;

@Service
public class ViagemService {
		
	@Autowired
	private ViagemRepository viagemRepo;
	
	public Viagem readATravelById(int id){
		return viagemRepo.findById(id)
						 .orElseThrow(() -> new NoSuchElementException("Viagem não encontrada"));
	}
	

	public List<Viagem> readTravelsBelongToUser(int user, Boolean finalised){
		List<Viagem> response = viagemRepo.selectTravelsByUserIdWhereFinalised(user, finalised);
				
		Optional.of(response)
				.map(list -> list.isEmpty()? null: list)
				.orElseThrow(() -> new NoSuchElementException("Viagens de usuário não encontradas"));
		
		return response;
	}
	

	public Viagem writeAnTravel(Viagem travel) {
		Optional.of(travel.getDestino())
				.map(d -> d.length() < 4? null: d)
				.map(d -> d.contains("  ")? null: d)
				.map(d -> d.length() > 20? null: d)
				.orElseThrow(() -> new IllegalArgumentException("Destino de viagem inválido"));
		
		Optional.of(travel.getInicio())
				.map(ini -> ini.length() < 10? null: ini)
				.map(ini -> ini.length() > 10? null: ini)
				.map(ini -> ini.contains(" ")? null: ini)
				.orElseThrow(() -> new IllegalArgumentException("Inicio de viagem inválido"));
		
		Optional.of(travel.getTermino())
				.map(t -> t.length() < 10? null: t)
				.map(t -> t.length() > 10? null: t)
				.map(t -> t.contains(" ")? null: t)
				.orElseThrow(() -> new IllegalArgumentException("Término de viagem inválido"));
		
		return viagemRepo.save(travel);
	}
	

	public Viagem editATravel( int id,  Viagem data) {
		Viagem viagemDB = 
			viagemRepo.findById(id)
				      .orElseThrow(() -> new NoSuchElementException("Não foi possível fazer a edição, viagem não encotrada"));
		
		String verifiedDestination =
			Optional.of(data.getDestino())
					.map(d -> d.length() < 4? null: d)
					.map(d -> d.contains("  ")? null: d)
					.map(d -> d.length() > 20? null: d)
					.orElseThrow(() -> new IllegalArgumentException("Destino de viagem inválido"));
		
		String verifiedInit =
			Optional.of(data.getInicio())
					.map(ini -> ini.length() < 10? null: ini)
					.map(ini -> ini.length() > 10? null: ini)
					.map(ini -> ini.contains(" ")? null: ini)
					.orElseThrow(() -> new IllegalArgumentException("Inicio de viagem inválido"));

		String verifiedEnd =
			Optional.of(data.getTermino())
					.map(t -> t.length() < 10? null: t)
					.map(t -> t.length() > 10? null: t)
					.map(t -> t.contains(" ")? null: t)
					.orElseThrow(() -> new IllegalArgumentException("Término de viagem inválido"));
		
		viagemDB.setDestino(verifiedDestination);
		viagemDB.setInicio(verifiedInit);
		viagemDB.setTermino(verifiedEnd);
		viagemDB.setImagem(data.getImagem());
		
		return viagemRepo.save(viagemDB);
	}
}
