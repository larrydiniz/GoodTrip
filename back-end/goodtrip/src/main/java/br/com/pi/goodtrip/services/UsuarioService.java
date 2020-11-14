package br.com.pi.goodtrip.services;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.pi.goodtrip.controllers.bodies.Senha;
import br.com.pi.goodtrip.models.Usuario;
import br.com.pi.goodtrip.repositories.UsuarioRepository;
import br.com.pi.goodtrip.utils.FileUpload;

@Service
public class UsuarioService {
	
	@Autowired
	private FileUpload fileUpload;
	
	@Autowired
	private UsuarioRepository repository;
	
	private Optional<String> hasValidEmailUserField(Usuario user){
		return Optional.of(user.getEmail())
						.filter(email -> repository.checkEmailExists(email).isEmpty())
						.map(email -> email.substring(0, email.indexOf("@")))
						.filter(username -> username.length() > 0)
						.filter(username -> !username.contains("@"))
						.filter(username -> !username.contains(" "));
	}
	
	private Optional<String> hasValidEmailDomain(Usuario user){
		return	Optional.of(user.getEmail())
						.map(email -> email.substring(email.indexOf("@") + 1, email.length()))
						.filter(domain -> domain.length() > 2)
						.filter(domain -> !domain.contains("@"))
						.filter(domain -> !domain.contains(" "))
						.filter(domain -> domain.indexOf(".") > 0)
						.filter(domain -> domain.lastIndexOf(".") < domain.length() - 1);
	}
	
	private Optional<String> hasValidUsername(Usuario user){
		return	Optional.of(user.getUsername())
					    .filter(n -> repository.checkUsernameExists(n).isEmpty())
					    .filter(n -> n.length() > 2)
					    .filter(n -> !n.contains("  "))
					    .filter(n -> n.contains("@"));
	}
	
	private Optional<String> hasValidName(Usuario user){
		return  Optional.of(user.getNome())
		                .filter(n -> n.length() > 2)
		                .filter(n -> !n.contains("  "));
	}
	
	public Usuario readUserById(int id) throws NoSuchElementException{
		Usuario foundUser = 
				 repository.findById(id)
						   .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));
		
		return foundUser;
	}
	
	public List<Usuario> readUserByEmailOrUsername(String q) throws NoSuchElementException{
		List<Usuario> users = repository.selectUserByEmailOrUsername(q);
		
		List<Usuario> verifiedUsersList =
		               Optional.of(users)
					           .filter(list -> !list.isEmpty())
					           .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));
		
		return verifiedUsersList;
	}
	

	public Usuario writeAnUser(Usuario user) throws IllegalArgumentException{
		
		hasValidUsername(user)
			.orElseThrow(() -> new IllegalArgumentException("Username de usuário inválido"));
		
		hasValidName(user)
		    .orElseThrow(() -> new IllegalArgumentException("Nome de usuário inválido"));
		
        hasValidEmailUserField(user)
        	.orElseThrow(() -> new IllegalArgumentException("Email com usuário inválido"));
        
        hasValidEmailDomain(user)
        	.orElseThrow(() -> new IllegalArgumentException("Email com domínio inválido"));
		
		return repository.save(user);
	}
	

	public Usuario editUserById( int id,  Usuario data) throws NoSuchElementException, IllegalArgumentException{
		Usuario toUpdate = 
				 repository.findById(id)
					  	   .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));
		
		String verifiedUsername =
				hasValidUsername(data)
					.orElseThrow(() -> new IllegalArgumentException("Username de usuário inválido"));
			
		String verifiedName = 
				hasValidName(data)
					.orElseThrow(() -> new IllegalArgumentException("Nome de usuário inválido"));
		
		toUpdate.setNome(verifiedName);
		toUpdate.setUsername(verifiedUsername);
		
		return repository.save(toUpdate);
	}
	
	public Usuario uploadUserImage(int user, MultipartFile file) throws NoSuchElementException, IOException{
		Usuario toUpdate = 
				 repository.findById(user)
						   .orElseThrow(() -> new NoSuchElementException("Não foi possível alterar foto de usuário. Usuário não encontrado"));
		
		String toSaveFilename = 
				Optional.ofNullable(file)
						.map(f -> fileUpload.saveFileTimestampNamed("images", file))
						.orElse("default_user_image.png");
		
		toUpdate.setFoto(toSaveFilename);
			
		return repository.save(toUpdate);
	}
	
	public Usuario editUserPassword( int id, Senha alterarSenha) {
		Usuario senhaUser = repository.findById(id)
				                      .orElseThrow(() -> new NoSuchElementException());
		
		if(senhaUser.getSenha().equals(alterarSenha.getSenha_atual())) {
			
			if(alterarSenha.getNova_senha().equals(alterarSenha.getConfirmar_senha())) {
				
				senhaUser.setSenha(alterarSenha.getNova_senha());
				repository.save(senhaUser);
				
				return senhaUser;
			}
		}
		
		return senhaUser;
	}
}
