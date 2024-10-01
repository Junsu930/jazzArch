package jazz_arch_back.jazz_arch.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentEditRequest {
    private Long commentNo;
    private String editedComment;
}

