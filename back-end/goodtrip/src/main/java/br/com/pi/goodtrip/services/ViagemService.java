package br.com.pi.goodtrip.services;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import br.com.pi.goodtrip.models.Viagem;
import br.com.pi.goodtrip.repositories.ViagemRepository;
import br.com.pi.goodtrip.utils.FileUpload;

@Service
public class ViagemService {
		
	@Autowired
	private FileUpload fileUpload;
	
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
	
	public Viagem uploadTravelImage(int travel, MultipartFile file) throws NoSuchElementException, IOException{
		Date date = new Date();
		
		Viagem findTravel = 
				viagemRepo.findById(travel)
						  .orElseThrow(() -> new NoSuchElementException("Não foi possível alterar imagem de viagem. Viagem não encontrada"));
		String filename =
				Optional.ofNullable(file.getOriginalFilename())
					    .map(n -> StringUtils.cleanPath(n))
					    .map(n -> date.getTime() + "-" + n)
					    .orElseThrow(() -> new IOException("..."));
		
		fileUpload.saveFile("images", filename, file);
		
		findTravel.setImagem(filename);
			
		return viagemRepo.save(findTravel);
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
		
		return viagemRepo.save(viagemDB);
	}
}
