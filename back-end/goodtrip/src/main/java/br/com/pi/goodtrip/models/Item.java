package br.com.pi.goodtrip.models;

import javax.persistence.CascadeType;
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
	@GeneratedValue(strategy = GenerationType.AUTO)
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
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "fk_id_viagem")
	@JsonIgnoreProperties("itens")
	private Viagem viagem;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "fk_id_usuario")
	@JsonIgnoreProperties("itens")
	private Usuario usuario;
	
	public Item() {}

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