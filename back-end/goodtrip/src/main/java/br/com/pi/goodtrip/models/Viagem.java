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
	private String inicio;
	
	@Column(name = "termino")
	private String termino;
	
	@Column(name = "imagem")
	private String imagem;
	
	@Column(name = "apagada")
	private Date apagada;
	
	@ManyToOne//(cascade= CascadeType.ALL)
	@JoinColumn(name = "fk_id_usuario")
	@JsonIgnoreProperties({ "tarefas", "itens"})
	private Usuario usuario;

	@OneToMany(fetch = FetchType.EAGER, mappedBy="viagem", cascade = CascadeType.ALL)
	@JsonIgnoreProperties({"viagem", "tarefas", "itens"})
	private Set<Embarque> embarques;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy="viagem", cascade = CascadeType.MERGE)
	@JsonIgnoreProperties({"viagem", "usuario", "itens"})
	private Set<Tarefa> tarefas;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy="viagem", cascade = CascadeType.ALL)
	@JsonIgnoreProperties({"viagem", "usuario", "tarefas"})
	private Set<Item> itens;
	
	public Viagem() {}
	
	public Viagem(Viagem body, Usuario usuario) {
		
		this.setDestino(body.getDestino());
		this.setInicio(body.getInicio());
		this.setTermino(body.getTermino());
		this.setFinalizada(body.getFinalizada());
		this.setImagem(body.getImagem());
		this.setUsuario(usuario);
	}
	
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


	public String getInicio() {
		return inicio;
	}


	public void setInicio(String inicio) {
		this.inicio = inicio;
	}


	public String getTermino() {
		return termino;
	}


	public void setTermino(String termino) {
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

	public Date getApagada() {
		return apagada;
	}

	public void setApagada(Date apagada) {
		this.apagada = apagada;
	}
	
}