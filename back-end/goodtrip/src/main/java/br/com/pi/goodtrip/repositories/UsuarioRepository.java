package br.com.pi.goodtrip.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import br.com.pi.goodtrip.models.Usuario;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, Integer>{
	
	String selectUserByEmailOrUsername = "SELECT * FROM usuarios WHERE email LIKE %:q% OR username LIKE %:q%";
	
	@Query(value = selectUserByEmailOrUsername, nativeQuery = true)
	List<Usuario> selectUserByEmailOrUsername(String q);
	
	
	String checkUsernameExists = "SELECT * FROM usuarios WHERE username=:user";
	
	@Query(value = checkUsernameExists, nativeQuery = true)
	List<Usuario> checkUsernameExists(String user);
	
	
	String checkEmailExists = "SELECT * FROM usuarios WHERE email=:email";
	
	@Query(value = checkEmailExists, nativeQuery = true)
	List<Usuario> checkEmailExists(String email);
}