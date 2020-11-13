package br.com.pi.goodtrip.utils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUpload {
	
	public void saveFile(String uploadDir, String filename, MultipartFile file) throws IOException{

		Path path = Paths.get(uploadDir);
		
		InputStream inputStream = 
					 Optional.of(file.getInputStream())
					 		 .orElseThrow(() -> new IOException("Conteúdo de arquivo com erro"));
		
		Path uploadPath =
			  Optional.of(path)
					  .filter(p -> Files.exists(p))
					  .orElseThrow(() -> new IOException("Diretório para upload não existe"))
					  .resolve(filename);
		
		Files.copy(inputStream, uploadPath, StandardCopyOption.REPLACE_EXISTING);
	}
}
