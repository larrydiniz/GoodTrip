package br.com.pi.goodtrip.services;

import java.nio.charset.StandardCharsets;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import br.com.pi.goodtrip.utils.Mail;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender emailSender;
	
	@Value( "${api.email.from.address}" )
    private String address;
    
    @Value( "${api.email.from.name}" )
    private String name;
    
    public void sendEmail(Mail mail, String token) {
    	try {
    		MimeMessage message = emailSender.createMimeMessage();
    		MimeMessageHelper helper = new MimeMessageHelper(message, 
    				MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
    				StandardCharsets.UTF_8.name());
    		
    		if(mail.getFromEmail() == null) {
    			mail.setFromEmail(address);
    		}
    		if(mail.getFromName() == null) {
    			mail.setFromName(name);
    		}
    		
    		helper.setTo(mail.getToEmail());
    		helper.setText("Olá siga este link para redefinir a sua senha: http://localhost:3000/redefine-password?token=" + token);
    		helper.setSubject(mail.getSubject());
            helper.setFrom(mail.getFromEmail(), mail.getFromName());
            
            emailSender.send(message);
    		
    	}
    	catch(Exception e) {
    		e.printStackTrace();
    	}
    }
}