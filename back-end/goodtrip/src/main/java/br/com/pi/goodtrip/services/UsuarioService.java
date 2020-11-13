package br.com.pi.goodtrip.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.pi.goodtrip.controllers.bodies.Senha;
import br.com.pi.goodtrip.models.Usuario;
import br.com.pi.goodtrip.repositories.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository repository;
	
	public Usuario readUserById(int id){
		return repository.findById(id)
						 .orElseThrow(() -> new NoSuchElementException());
	}
	
	public List<Usuario> readUserByEmailOrUsername(String q) {
		List<Usuario> users = repository.selectUserByEmailOrUsername(q);
		
		return Optional.of(users)
					   .map(list -> list.isEmpty()? null: list)
					   .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));
	}
	

	public Usuario writeAnUser(Usuario user) {
		Optional.of(user.getUsername())
				.map(n -> !repository.checkUsernameExists(n).isEmpty()? null: n)
				.map(n -> n.length() < 3? null: n)
				.map(n -> n.contains("  ")? null: n)
				.map(n -> !n.contains("@")? null: n)
				.orElseThrow(() -> new IllegalArgumentException("Username de usuário inválido"));
		
        Optional.of(user.getNome())
        		.map(n -> n.length() < 3? null: n)
        		.map(n -> n.contains("  ")? null: n)
        		.orElseThrow(() -> new IllegalArgumentException("Nome de usuário inválido"));
        
        Optional.of(user.getEmail())
        		.map(email -> !repository.checkEmailExists(email).isEmpty()? null: email)
        		.map(email -> email.substring(0, email.indexOf("@")))
        		.map(username -> username.length() < 1? null: username)
        		.map(username -> username.contains("@")? null: username)
        		.map(username -> username.contains(" ")? null: username)
        		.orElseThrow(() -> new IllegalArgumentException("Email com usuário inválido"));
        
		Optional.of(user.getEmail())
				.map(email -> email.substring(email.indexOf("@") + 1, email.length()))
				.map(domain -> domain.length() < 3? null: domain)
				.map(domain -> domain.contains("@")? null: domain)
				.map(domain -> domain.contains(" ")? null: domain)
				.map(domain -> domain.indexOf(".") < 1? null: domain)
				.map(domain -> domain.lastIndexOf(".") > domain.length() - 1? null: domain)
				.orElseThrow(() -> new IllegalArgumentException("Email com domínio inválido"));
		
		return repository.save(user);
	}
	

	public Usuario editUserById( int id,  Usuario data){
		Usuario userDB = 
			repository.findById(id)
					  .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));
		
		String verifiedUsername =
			Optional.of(data.getUsername())
				.map(n -> !repository.checkUsernameExists(n).isEmpty()? null: n)
				.map(n -> n.length() < 3? null: n)
				.map(n -> n.contains("  ")? null: n)
				.map(n -> !n.contains("@")? null: n)
				.orElseThrow(() -> new IllegalArgumentException("Username de usuário inválido"));

		String verifiedName =
			Optional.of(data.getNome())
				.map(n -> n.length() < 3? null: n)
				.map(n -> n.contains("  ")? null: n)
				.orElseThrow(() -> new IllegalArgumentException("Nome de usuário inválido"));
		
		userDB.setFoto(data.getFoto());
		userDB.setNome(verifiedName);
		userDB.setUsername(verifiedUsername);
		
		return repository.save(userDB);
	}
	
	public Usuario editUserPassword(int id, Senha alterarSenha) {
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
