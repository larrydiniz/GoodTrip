package br.com.pi.goodtrip.services;

import java.io.IOException;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import br.com.pi.goodtrip.dto.CredenciaisDTO;
import br.com.pi.goodtrip.dto.Senha;
import br.com.pi.goodtrip.dto.TokenDTO;
import br.com.pi.goodtrip.exceptions.SenhaInvalidaException;
import br.com.pi.goodtrip.models.Usuario;
import br.com.pi.goodtrip.repositories.UsuarioRepository;
import br.com.pi.goodtrip.utils.FileUpload;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {
	
	@Autowired
	private final UsuarioServiceImpl usuarioServiceImpl;
	
	@Autowired
	private final PasswordEncoder passwordEncoder;
	
	@Autowired
	private final JwtService jwtService;

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
	
	public Usuario readUserByEmailOrUsername(String q) throws NoSuchElementException{
		Usuario foundUser = repository.selectUserByEmailOrUsername(q)
									  .stream()
									  .findFirst()
									  .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));
		
		
		return foundUser;
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
        
        String cryptPassword = passwordEncoder.encode(user.getSenha());
        
		user.setSenha(cryptPassword);
		
		user.setFoto("../../back-end/goodtrip/images/default_user_image.png");
		
		return usuarioServiceImpl.salvar(user);
	}
	

	public Usuario editUserById( int id,  Usuario data) throws NoSuchElementException, IllegalArgumentException{
		Usuario toUpdate = 
				 repository.findById(id)
					  	   .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));
		
		if(!(data.getNome().equals("__inalterado__"))) {
			
			String verifiedName = 
					hasValidName(data)
					.orElseThrow(() -> new IllegalArgumentException("Nome de usuário inválido"));
			
			toUpdate.setNome(verifiedName);
		}
		
		if(!(data.getUsername().equals("__inalterado__"))) {
			
			String verifiedUsername =
					hasValidUsername(data)
					.orElseThrow(() -> new IllegalArgumentException("Username de usuário inválido"));
			
			
			toUpdate.setUsername(verifiedUsername);
		}
		
		
		return repository.save(toUpdate);
	}
	
	public Usuario uploadUserImage(int user, MultipartFile file) throws NoSuchElementException, IOException{
		Usuario toUpdate = 
				 repository.findById(user)
						   .orElseThrow(() -> new NoSuchElementException("Não foi possível alterar foto de usuário. Usuário não encontrado"));
		
		String toSaveFilename = 
				Optional.ofNullable(file)
						.map(f -> fileUpload.saveFileTimestampNamed("images", file))
						.orElse("../../back-end/goodtrip/images/default_user_image.png");
		
		toUpdate.setFoto(toSaveFilename);
			
		return repository.save(toUpdate);
	}
	
	public Usuario editUserPassword(int id, Senha senha) {
		Usuario user = repository.findById(id)
				                      .orElseThrow(() -> new NoSuchElementException());
		
		boolean senhasBatem = passwordEncoder.matches(senha.getSenha_atual(), user.getSenha());
		
		if(senhasBatem) {
			
			if(senha.getNova_senha().equals(senha.getConfirmar_senha())) {
				
				String cryptPassword = passwordEncoder.encode(senha.getNova_senha());

				user.setSenha(cryptPassword);
				repository.save(user);
				
				return user;
				
			} else throw new IllegalArgumentException("As senhas não batem");
			
		} else throw new IllegalArgumentException("Senha inválida");
	}
	
	public Usuario softDeleteUser(int id) throws NoSuchElementException{
		Usuario deleteUser = 
				 repository.findById(id)
						   .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));
		
		deleteUser.setAtivo(false);
		
		return repository.save(deleteUser);
	}
	
	public TokenDTO authenticate(CredenciaisDTO credenciais) {
		try {
			
			Usuario foundByEmail = repository.checkEmailExists(credenciais.getEmail())
											 .stream()
											 .findFirst()
											 .orElseThrow(() -> new UsernameNotFoundException("Email de usuário inválido"));
			
			Usuario usuario = Usuario.builder()
					                 .email(credenciais.getEmail())
					                 .senha(credenciais.getSenha()).build();
			
			usuarioServiceImpl.autenticar(usuario);
			String token = jwtService.gerarToken(usuario);
			
			return new TokenDTO(foundByEmail.getId(), usuario.getEmail(), token);
			
		} catch (UsernameNotFoundException | SenhaInvalidaException e){
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());	
		}
	}
	
}
