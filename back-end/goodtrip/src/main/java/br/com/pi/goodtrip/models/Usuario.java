package br.com.pi.goodtrip.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "usuarios")
public class Usuario{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_usuario")
	private int id;
	
	@Column(name ="nome")
	private String nome;
	
	@Column(name ="email")
	private String email;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "senha")
	private String senha;
	
	@Column(name = "ativo")
	private Boolean ativo;
	
	public Usuario() {}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public Boolean getAtivo() {
		return ativo;
	}
	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}
}