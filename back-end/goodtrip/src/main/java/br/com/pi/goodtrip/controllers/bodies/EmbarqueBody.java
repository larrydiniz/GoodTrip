package br.com.pi.goodtrip.controllers.bodies;

public class EmbarqueBody {
	
	private int usuarioId;
	private int viagemId;
	private Boolean finalizada;
	private Boolean aceito;
	
	public int getUsuarioId() {
		return usuarioId;
	}
	public void setUsuarioId(int usuarioId) {
		this.usuarioId = usuarioId;
	}
	public int getViagemId() {
		return viagemId;
	}
	public void setViagemId(int viagemId) {
		this.viagemId = viagemId;
	}
	public Boolean getFinalizada() {
		return finalizada;
	}
	public void setFinalizada(Boolean finalizada) {
		this.finalizada = finalizada;
	}
	public Boolean getAceito() {
		return aceito;
	}
	public void setAceito(Boolean aceito) {
		this.aceito = aceito;
	}
}
