package jazz_arch_back.jazz_arch.service;

import jazz_arch_back.jazz_arch.dto.Image;
import org.springframework.stereotype.Service;


public interface ImageService {
    Image saveImagePath(String path);

}
