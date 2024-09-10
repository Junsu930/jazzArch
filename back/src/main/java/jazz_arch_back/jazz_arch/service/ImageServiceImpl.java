package jazz_arch_back.jazz_arch.service;

import jazz_arch_back.jazz_arch.dto.Image;
import jazz_arch_back.jazz_arch.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageServiceImpl implements ImageService{
    private ImageRepository imageRepository;
    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository){
        this.imageRepository = imageRepository;
    }

    public Image saveImagePath(String path) {
        Image image = new Image(path);
        return imageRepository.save(image);
    }
}
