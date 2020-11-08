package br.com.pi.goodtrip.controllers.bodies;

import java.util.Date;


public class ViagemBody {
	
	private int usuarioId;
	private String destino;
	private Boolean finalizada;
	private Date inicio;
	private Date termino;
	private String imagem;
	
	public int getUsuarioId() {
		return usuarioId;
	}
	public void setUsuarioId(int usuarioId) {
		this.usuarioId = usuarioId;
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
	
}
