package jazz_arch_back.jazz_arch.repository;

import jazz_arch_back.jazz_arch.dto.ClubList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClubRepository extends JpaRepository<ClubList, String> {
}
