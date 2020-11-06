package br.com.pi.goodtrip.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "viagens")
public class Viagem{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_viagem")
	private int idViagem;
	
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
	
	@ManyToOne
	@JoinColumn(name = "fk_id_usuario")
	private Usuario idUsuario;
	
	public Viagem() {}
	
	public int getIdViagem() {
		return idViagem;
	}


	public void setIdViagem(int idViagem) {
		this.idViagem = idViagem;
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


	public Usuario getIdUsuario() {
		return idUsuario;
	}


	public void setIdUsuario(Usuario idUsuario) {
		this.idUsuario = idUsuario;
	}
}