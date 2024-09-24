package jazz_arch_back.jazz_arch.repository;


import jazz_arch_back.jazz_arch.dto.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c JOIN FETCH c.author WHERE c.board.boardNo = :boardNo")
    List<Comment> findByBoardNoWithAuthor(@Param("boardNo") Long boardNo);
}
