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
	
	public Viagem readATravelById(int id) throws NoSuchElementException{
		return viagemRepo.findById(id)
						 .orElseThrow(() -> new NoSuchElementException("Viagem não encontrada"));
	}
	

	public List<Viagem> readTravelsBelongToUser(int user, Boolean finalised) throws NoSuchElementException{
		List<Viagem> response = viagemRepo.selectTravelsByUserIdWhereFinalised(user, finalised);
				
		Optional.of(response)
				.filter(list -> !list.isEmpty())
				.orElseThrow(() -> new NoSuchElementException("Viagens de usuário não encontradas"));
		
		return response;
	}
	

	public Viagem writeAnTravel(Viagem travel) throws IllegalArgumentException{
		Optional.of(travel.getDestino())
				.filter(d -> d.length() > 3)
				.filter(d -> !d.contains("  "))
				.filter(d -> d.length() < 20)
				.orElseThrow(() -> new IllegalArgumentException("Destino de viagem inválido"));
		
		Optional.of(travel.getInicio())
				.filter(ini -> !(ini.length() > 10))
				.filter(ini -> !(ini.length() < 8))
				.filter(ini -> !ini.contains(" "))
				.orElseThrow(() -> new IllegalArgumentException("Inicio de viagem inválido"));
		
		Optional.of(travel.getTermino())
				.filter(t -> !(t.length() > 10))
				.filter(t -> !(t.length() < 8))
				.filter(t -> !t.contains(" "))
				.orElseThrow(() -> new IllegalArgumentException("Término de viagem inválido"));
		
		return viagemRepo.save(travel);
	}
	

	public Viagem editATravel( int id,  Viagem data) throws NoSuchElementException, IllegalArgumentException{
		Viagem viagemDB = 
			viagemRepo.findById(id)
				      .orElseThrow(() -> new NoSuchElementException("Não foi possível fazer a edição, viagem não encotrada"));
		
		String verifiedDestination =
				Optional.of(data.getDestino())
					.filter(d -> d.length() > 3)
					.filter(d -> !d.contains("  "))
					.filter(d -> d.length() < 20)
					.orElseThrow(() -> new IllegalArgumentException("Destino de viagem inválido"));
		
		String verifiedInit =
				Optional.of(data.getInicio())
					.filter(ini -> !(ini.length() > 10))
					.filter(ini -> !(ini.length() < 8))
					.filter(ini -> !ini.contains(" "))
					.orElseThrow(() -> new IllegalArgumentException("Inicio de viagem inválido"));

		String verifiedEnd =
				Optional.of(data.getTermino())
					.filter(t -> !(t.length() > 10))
					.filter(t -> !(t.length() < 8))
					.filter(t -> !t.contains(" "))
					.orElseThrow(() -> new IllegalArgumentException("Término de viagem inválido"));
		
		viagemDB.setDestino(verifiedDestination);
		viagemDB.setInicio(verifiedInit);
		viagemDB.setTermino(verifiedEnd);
		viagemDB.setImagem(data.getImagem());
		
		/*se imagem for vazia, setar a padrão do sistema*/
		
		return viagemRepo.save(viagemDB);
	}
}
