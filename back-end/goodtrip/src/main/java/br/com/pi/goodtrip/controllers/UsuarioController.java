package br.com.pi.goodtrip.controllers;

import java.io.IOException;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.pi.goodtrip.dto.CredenciaisDTO;
import br.com.pi.goodtrip.dto.Senha;
import br.com.pi.goodtrip.dto.TokenDTO;
import br.com.pi.goodtrip.models.Usuario;
import br.com.pi.goodtrip.services.UsuarioService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("usuarios")
public class UsuarioController {
	
	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping("ler/{id}")
	public Usuario lerConvite(@PathVariable(value = "id") int id){
		return usuarioService.readUserById(id);
	}
	
	@GetMapping("/buscar")
	public Usuario searchByUsernameOrEmail(@RequestParam String q) {
		return usuarioService.readUserByEmailOrUsername(q);
	}
	
	@PostMapping("escrever")
	@ResponseStatus (HttpStatus.CREATED)
	public Usuario escreverUsuario(@RequestBody Usuario usuario) {
		return usuarioService.writeAnUser(usuario);
	}
	
	@PostMapping("/auth")
	public TokenDTO autenticar(@RequestBody CredenciaisDTO credenciais) {
		return usuarioService.authenticate(credenciais);	
	}
	
	@PutMapping("/editar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Usuario editarUsuario(@PathVariable int id, @RequestBody Usuario dadosUser){
		return usuarioService.editUserById(id, dadosUser);
	}
	
	
	@PutMapping("/alterarSenha/{id}")
	public Usuario editarSenha(@PathVariable int id, @RequestBody Senha alterarSenha){
		return usuarioService.editUserPassword(id, alterarSenha);
	}
	
	@PostMapping("/upload/foto/{id}")
	public Usuario editarFotoUsuario(@PathVariable int id, @RequestPart("foto") MultipartFile file) throws NoSuchElementException, IOException{
		return usuarioService.uploadUserImage(id, file);
	}
	
	@PutMapping("/apagar/{id}")
	public Usuario apagarUsuario(@PathVariable int id){
		return usuarioService.softDeleteUser(id);
	}
	
}