package br.com.pi.goodtrip.dto;

public class TokenDTO {
	private Integer id;
	private String email;
	private String token;

	public TokenDTO() {
		
	}
	
	public TokenDTO(Integer id, String email, String token) {
		this.id = id;
		this.email = email;
		this.token = token;
	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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
