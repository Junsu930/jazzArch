package jazz_arch_back.jazz_arch.repository;

import jazz_arch_back.jazz_arch.dto.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
