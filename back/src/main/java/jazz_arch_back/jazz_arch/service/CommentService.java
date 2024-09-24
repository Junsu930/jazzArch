package jazz_arch_back.jazz_arch.service;

import jazz_arch_back.jazz_arch.dto.Comment;

import java.util.List;

public interface CommentService {

    public List<Comment> getComment(Long boardNo);
}
