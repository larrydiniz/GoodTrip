package br.com.pi.goodtrip.utils;

import lombok.Data;

@Data
public class Mail {
	private String fromEmail; 
	private String toEmail; 
	private String subject; 
	private String fromName; 
}
