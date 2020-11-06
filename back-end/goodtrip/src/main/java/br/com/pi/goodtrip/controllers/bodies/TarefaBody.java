package br.com.pi.goodtrip.controllers.bodies;

import java.util.Date;


public class TarefaBody {
	
	private int usuarioId;
	private int viagemId;
	private String titulo;
	private String descricao;
	private Date data;
	private Date horario;
	private float custo;
	private int moeda;
	private int transporte;
	private Boolean finalizada;
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
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public Date getData() {
		return data;
	}
	public void setData(Date data) {
		this.data = data;
	}
	public Date getHorario() {
		return horario;
	}
	public void setHorario(Date horario) {
		this.horario = horario;
	}
	public float getCusto() {
		return custo;
	}
	public void setCusto(float custo) {
		this.custo = custo;
	}
	public int getMoeda() {
		return moeda;
	}
	public void setMoeda(int moeda) {
		this.moeda = moeda;
	}
	public int getTransporte() {
		return transporte;
	}
	public void setTransporte(int transporte) {
		this.transporte = transporte;
	}
	public Boolean getFinalizada() {
		return finalizada;
	}
	public void setFinalizada(Boolean finalizada) {
		this.finalizada = finalizada;
	}
	public Boolean getPessoal() {
		return pessoal;
	}
	public void setPessoal(Boolean pessoal) {
		this.pessoal = pessoal;
	}
}
