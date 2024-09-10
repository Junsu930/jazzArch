package jazz_arch_back.jazz_arch.controller;

import jazz_arch_back.jazz_arch.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/public/image")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @Value("${upload.path}") // application.properties에 설정한 이미지 저장 경로
    private String uploadPath;

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return "파일을 선택해주세요.";
        }

        // 저장할 파일 이름 설정 (원본 파일 이름 사용)
        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(uploadPath + File.separator + fileName);

        try {
            // 파일을 서버에 저장
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
            return "파일 업로드 실패.";
        }

        // 저장된 파일 경로 또는 URL을 반환 (데이터베이스 저장용)
        return filePath.toString();
    }
}
