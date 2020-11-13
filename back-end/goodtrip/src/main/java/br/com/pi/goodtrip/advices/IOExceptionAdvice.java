package br.com.pi.goodtrip.advices;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class IOExceptionAdvice {
	@ExceptionHandler(IOException.class)
	@ResponseStatus(code = HttpStatus.OK)
	IOException ioExceptionAdvice(IOException ex) {
		
		return ex;
	}
}
