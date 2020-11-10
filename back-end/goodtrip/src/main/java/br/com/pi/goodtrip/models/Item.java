package br.com.pi.goodtrip.models;

//import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "itens")
public class Item{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name ="nome")
	private String nome;
	
	@Column(name = "categoria")
	private int categoria;
	
	@Column(name = "checado")
	private Boolean checado;
	
	@Column(name = "ativo")
	private Boolean ativo;
	
	@Column(name = "pessoal")
	private Boolean pessoal;
	
	@ManyToOne//(cascade = CascadeType.ALL)
	@JoinColumn(name = "fk_id_viagem")
	@JsonIgnoreProperties({"itens", "usuarios", "tarefas", "embarques"})
	private Viagem viagem;
	
	@ManyToOne//(cascade = CascadeType.ALL)
	@JoinColumn(name = "fk_id_usuario")
	@JsonIgnoreProperties({"itens", "viagens", "tarefas", "embarques"})
	private Usuario usuario;
	
	public Item() {}
	
	public Item(Item item, Usuario usuario, Viagem viagem) {
		
		this.setNome(item.getNome());
		this.setCategoria(item.getCategoria());
		this.setChecado(item.getChecado());
		this.setPessoal(item.getPessoal());
		this.setAtivo(item.getAtivo());
		
		this.setUsuario(usuario);
		this.setViagem(viagem);
	}

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

	public int getCategoria() {
		return categoria;
	}

	public void setCategoria(int categoria) {
		this.categoria = categoria;
	}

	public Boolean getChecado() {
		return checado;
	}

	public void setChecado(Boolean checado) {
		this.checado = checado;
	}

	public Boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}

	public Boolean getPessoal() {
		return pessoal;
	}

	public void setPessoal(Boolean pessoal) {
		this.pessoal = pessoal;
	}

	public Viagem getViagem() {
		return viagem;
	}

	public void setViagem(Viagem viagem) {
		this.viagem = viagem;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

}