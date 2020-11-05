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

@Entity
@Table(name = "embarques")
public class Embarque{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_embarque")
	private int idEmbarque;
	
	@Column(name = "aceito")
	private Boolean aceito;
	
	@Column(name = "finalizada")
	private Boolean finalizada;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private Viagem viagem;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private Usuario usuario;
	
	public Embarque() {}
	
	public int getIdEmbarque() {
		return idEmbarque;
	}
	
	public void setIdEmbarque(int idEmbarque) {
		this.idEmbarque = idEmbarque;
	}
	
	public Boolean getAceito() {
		return aceito;
	}
	
	public void setAceito(Boolean aceito) {
		this.aceito = aceito;
	}
	
	public Boolean getFinalizada() {
		return finalizada;
	}
	
	public void setFinalizada(Boolean finalizada) {
		this.finalizada = finalizada;
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