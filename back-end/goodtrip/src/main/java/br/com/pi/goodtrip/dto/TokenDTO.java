package br.com.pi.goodtrip.dto;

public class TokenDTO {
	private String email;
	private String token;

	public TokenDTO() {
		
	}
	
	public TokenDTO(String email, String token) {
		this.email = email;
		this.token = token;
	}


	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
