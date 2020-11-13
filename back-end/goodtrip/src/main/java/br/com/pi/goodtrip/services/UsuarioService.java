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
	
	public Usuario readUserById(int id) throws NoSuchElementException{
		Usuario user = repository.findById(id)
						         .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));
		
		return user;
	}
	
	public List<Usuario> readUserByEmailOrUsername(String q) throws NoSuchElementException{
		List<Usuario> users = repository.selectUserByEmailOrUsername(q);
		
		return Optional.of(users)
					   .filter(list -> !list.isEmpty())
					   .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));
	}
	

	public Usuario writeAnUser(Usuario user) throws IllegalArgumentException{
		Optional.of(user.getUsername())
				.filter(n -> repository.selectUserByEmailOrUsername(n).isEmpty())
				.filter(n -> n.length() > 2)
				.filter(n -> !n.contains("  "))
				.filter(n -> n.contains("@"))
				.orElseThrow(() -> new IllegalArgumentException("Username de usuário inválido"));
		
        Optional.of(user.getNome())
        		.filter(n -> n.length() > 2)
        		.filter(n -> !n.contains("  "))
        		.orElseThrow(() -> new IllegalArgumentException("Nome de usuário inválido"));
        
        Optional.of(user.getEmail())
        		.filter(email -> repository.selectUserByEmailOrUsername(email).isEmpty())
        		.map(email -> email.substring(0, email.indexOf("@")))
        		.filter(username -> username.length() > 0)
        		.filter(username -> !username.contains("@"))
        		.filter(username -> !username.contains(" "))
        		.orElseThrow(() -> new IllegalArgumentException("Email com usuário inválido"));
        
		Optional.of(user.getEmail())
				.map(email -> email.substring(email.indexOf("@") + 1, email.length()))
				.filter(domain -> domain.length() > 2)
				.filter(domain -> !domain.contains("@"))
				.filter(domain -> !domain.contains(" "))
				.filter(domain -> domain.indexOf(".") > 0)
				.filter(domain -> domain.lastIndexOf(".") < domain.length() - 1)
				.orElseThrow(() -> new IllegalArgumentException("Email com domínio inválido"));
		
		return repository.save(user);
	}
	

	public Usuario editUserById( int id,  Usuario data) throws NoSuchElementException, IllegalArgumentException{
		Usuario userDB = 
				 repository.findById(id)
					  	   .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));
		
		String verifiedUsername =
				Optional.of(data.getUsername())
						.filter(n -> repository.selectUserByEmailOrUsername(n).isEmpty())
						.filter(n -> n.length() >= 3)
						.filter(n -> !n.contains("  "))
						.filter(n -> n.contains("@"))
						.orElseThrow(() -> new IllegalArgumentException("Username de usuário inválido"));

		String verifiedName =
				Optional.of(data.getNome())
						.filter(n -> n.length() > 2)
						.filter(n -> !n.contains("  "))
						.orElseThrow(() -> new IllegalArgumentException("Nome de usuário inválido"));
		
		userDB.setNome(verifiedName);
		userDB.setUsername(verifiedUsername);
		
		return repository.save(userDB);
	}
	
	public Usuario uploadUserImage(int user, MultipartFile file) throws NoSuchElementException, IOException{
		Date date = new Date();
		
		Usuario findUser = 
				 repository.findById(user)
						   .orElseThrow(() -> new NoSuchElementException("Não foi possível alterar foto de usuário. Usuário não encontrado"));
		String filename =
				Optional.of(file)
						.map(f -> f.getOriginalFilename())
						.map(n -> StringUtils.cleanPath(n))
						.map(n -> date.getTime() + "-" + n)
						.orElseThrow(() -> new IOException("..."));
		
		fileUpload.saveFile("images", filename, file);
		
		findUser.setFoto(filename);
			
		return repository.save(findUser);
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
