package br.com.pi.goodtrip.utils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.Optional;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUpload {
	
	@Nullable
	public String saveFileTimestampNamed(String uploadDir, MultipartFile file){
		Path path = Paths.get(uploadDir);
		Date date = new Date();
		
		try {
			
			String filename =
					Optional.ofNullable(file.getOriginalFilename())
					        .map(n -> StringUtils.cleanPath(n))
					        .map(n -> date.getTime() + "-" + n)
					        .orElseThrow(() -> new IOException("Arquivo inválido"));
			
			InputStream inputStream = 
						 Optional.of(file.getInputStream())
					             .orElseThrow(() -> new IOException("Conteúdo de arquivo com erro"));
			
			Path uploadPath =
				  Optional.of(path)
					      .filter(p -> Files.exists(p))
					      .orElseThrow(() -> new IOException("Diretório para upload não existe"))
					      .resolve(filename);
			
			Files.copy(inputStream, uploadPath, StandardCopyOption.REPLACE_EXISTING);
			
			return filename;
		}
		catch(IOException e) {
			
			return null;
		}
	}
}
