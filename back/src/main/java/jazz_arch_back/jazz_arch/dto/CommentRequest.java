package jazz_arch_back.jazz_arch.dto;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class CommentRequest {
    private String comment;
    private Long boardNo;
    private Long authorId;
}
