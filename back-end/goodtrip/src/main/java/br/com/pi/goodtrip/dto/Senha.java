package br.com.pi.goodtrip.dto;

import org.springframework.stereotype.Component;

@Component
public class Senha {
	
	private String senha_atual;
	private String nova_senha;
	private String confirmar_senha;
	
	public Senha(){}
	
	public String getSenha_atual() {
		return senha_atual;
	}
	public void setSenha_atual(String senha_atual) {
		this.senha_atual = senha_atual;
	}
	public String getNova_senha() {
		return nova_senha;
	}
	public void setNova_senha(String nova_senha) {
		this.nova_senha = nova_senha;
	}
	public String getConfirmar_senha() {
		return confirmar_senha;
	}
	public void setConfirmar_senha(String confirmar_senha) {
		this.confirmar_senha = confirmar_senha;
	}
}
