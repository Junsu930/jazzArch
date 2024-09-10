package jazz_arch_back.jazz_arch.repository;

import jazz_arch_back.jazz_arch.dto.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
