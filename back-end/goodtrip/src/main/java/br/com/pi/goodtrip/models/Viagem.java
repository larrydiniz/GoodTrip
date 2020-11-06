package br.com.pi.goodtrip.models;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "viagens")
public class Viagem{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "destino")
	private String destino;
	
	@Column(name = "finalizada")
	private Boolean finalizada;
	
	@Column(name = "inicio")
	@Temporal(TemporalType.DATE)
	private Date inicio;
	
	@Column(name = "termino")
	@Temporal(TemporalType.DATE)
	private Date termino;
	
	@Column(name = "imagem")
	private String imagem;
	
	@ManyToOne(cascade= CascadeType.ALL)
	@JoinColumn(name = "fk_id_usuario")
	@JsonIgnoreProperties("viagens")
	private Usuario usuario;

	@OneToMany(fetch = FetchType.EAGER, mappedBy="viagem", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("viagem")
	private Set<Embarque> embarques;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy="viagem", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("viagem")
	private Set<Tarefa> tarefas;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy="viagem", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("viagem")
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

	public Set<Embarque> getEmbarques() {
		return embarques;
	}

	public void setEmbarques(Set<Embarque> embarques) {
		this.embarques = embarques;
	}

	public Viagem() {}
	
	public int getId() {
		return id;
	}

	public void setId(int idViagem) {
		this.id = idViagem;
	}


	public String getDestino() {
		return destino;
	}


	public void setDestino(String destino) {
		this.destino = destino;
	}


	public Boolean getFinalizada() {
		return finalizada;
	}


	public void setFinalizada(Boolean finalizada) {
		this.finalizada = finalizada;
	}


	public Date getInicio() {
		return inicio;
	}


	public void setInicio(Date inicio) {
		this.inicio = inicio;
	}


	public Date getTermino() {
		return termino;
	}


	public void setTermino(Date termino) {
		this.termino = termino;
	}
	
	public String getImagem() {
		return imagem;
	}

	public void setImagem(String imagem) {
		this.imagem = imagem;
	}

	public Usuario getUsuario() {
		return usuario;
	}


	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
}