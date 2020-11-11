package br.com.pi.goodtrip.models;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "usuarios")
public class Usuario{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name ="nome")
	private String nome;
	
	@Column(name ="email")
	private String email;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "senha")
	private String senha;
	
	@Column(name = "foto")
	private String foto;
	
	@Column(name = "ativo")
	private Boolean ativo;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy="usuario", cascade = CascadeType.ALL)
	@JsonIgnoreProperties({"usuario", "tarefas", "itens", "embarques"})
    private Set<Viagem> viagens;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy="usuario", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Embarque> embarques;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy="usuario", cascade = CascadeType.MERGE)
	@JsonIgnore
	private Set<Tarefa> tarefas;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy="usuario", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Item> itens;

	public Set<Tarefa> getTarefas() {
		return tarefas;
	}

	public void setTarefas(Set<Tarefa> tarefas) {
		this.tarefas = tarefas;
	}

	public Set<Item> getItens() {
		return itens;
	}

	public void setItens(Set<Item> itens) {
		this.itens = itens;
	}

	public Set<Viagem> getViagens() {
		return viagens;
	}

	public void setViagens(Set<Viagem> viagens) {
		this.viagens = viagens;
	}

	public Set<Embarque> getEmbarques() {
		return embarques;
	}

	public void setEmbarques(Set<Embarque> embarques) {
		this.embarques = embarques;
	}

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
	public String getFoto() {
		return foto;
	}
	public void setFoto(String foto) {
		this.foto = foto;
	}
	public Boolean getAtivo() {
		return ativo;
	}
	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}
}