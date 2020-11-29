package br.com.pi.goodtrip.services;

//import javax.mail.PasswordAuthentication;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

//import javax.mail.Authenticator;
//import javax.mail.Session;
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
    
    private String mailSMTPServer;
	private Integer mailSMTPServerPort;
	
	
	  //quando instanciar um Objeto ja sera atribuido o servidor SMTP do GMAIL e a porta usada por ele
	 
	EmailService() { //Para o GMAIL 
		mailSMTPServer = "smtp.gmail.com";
		mailSMTPServerPort = 587;
	}
	
	 //caso queira mudar o servidor e a porta, so enviar para o contrutor os valor como string
	 
	/*EmailService(String mailSMTPServer, String mailSMTPServerPort) { //Para outro Servidor
		this.mailSMTPServer = mailSMTPServer;
		this.mailSMTPServerPort = mailSMTPServerPort;
	}*/
    
    public void sendEmail(Mail mail, String token) {
	    	Properties props = new Properties();
	    	
			props.put("mail.transport.protocol", "smtp"); //define protocolo de envio como SMTP
			props.put("mail.smtp.starttls.enable","true"); 
			props.put("mail.smtp.host", mailSMTPServer); //server SMTP do GMAIL
			props.put("mail.smtp.auth", "true"); //ativa autenticacao
			props.put("mail.smtp.user", address); //usuario ou seja, a conta que esta enviando o email (tem que ser do GMAIL)
			props.put("mail.debug", "true");
			props.put("mail.smtp.port", mailSMTPServerPort); //porta
			props.put("mail.smtp.socketFactory.port", mailSMTPServerPort); //mesma porta para o socket
			props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
			props.put("mail.smtp.socketFactory.fallback", "false");
			
			/*Authenticator auth = new Authenticator(){
				
				@Override
			    protected PasswordAuthentication getPasswordAuthentication() {   
			        return new PasswordAuthentication(name, password);  
			    } 
			};
		
			
			Session session = Session.getDefaultInstance(props, auth);
			session.setDebug(true);*/
		
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
    		helper.setText("Olá siga este link para redefinir a sua senha: http://127.0.0.1:5500/front-end/views/recuperar-senha.html?token=" + token);
    		helper.setSubject(mail.getSubject());
            helper.setFrom(mail.getFromEmail(), mail.getFromName());
            
            emailSender.send(message);
    		
    	}
    	catch(Exception e) {
    		e.printStackTrace();
    	}
    }
    
}