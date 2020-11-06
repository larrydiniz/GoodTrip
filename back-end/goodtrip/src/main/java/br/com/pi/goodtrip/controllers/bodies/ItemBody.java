package br.com.pi.goodtrip.controllers.bodies;

public class ItemBody {
	
	private int usuarioId;
	private int viagemId;
	private String nome;
	private int categoria;
	private Boolean checado;
	private Boolean ativo;
	private Boolean pessoal;
	
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
}
