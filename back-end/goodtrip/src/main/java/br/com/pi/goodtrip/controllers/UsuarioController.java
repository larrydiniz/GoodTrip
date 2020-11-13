package br.com.pi.goodtrip.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.pi.goodtrip.controllers.bodies.Senha;
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
	public List<Usuario> searchByUsernameOrEmail(@RequestParam String q) {
		return usuarioService.readUserByEmailOrUsername(q);
	}
	
	@PostMapping("escrever")
	public Usuario escreverUsuario(@RequestBody Usuario usuario) {
		return usuarioService.writeAnUser(usuario);
	}
	
	@PutMapping("/editar/{id}")
	public Usuario editarUsuario(@PathVariable int id, @RequestBody Usuario dadosUser){
		return usuarioService.editUserById(id, dadosUser);
	}
	
	
	@PutMapping("/alterarSenha/{id}")
	public Usuario editarSenha(@PathVariable int id, @RequestBody Senha alterarSenha){
		return usuarioService.editUserPassword(id, alterarSenha);
	}
	
}