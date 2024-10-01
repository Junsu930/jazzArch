package jazz_arch_back.jazz_arch.service;

import jazz_arch_back.jazz_arch.dto.Comment;
import jazz_arch_back.jazz_arch.dto.CommentEditRequest;

import java.util.List;
import java.util.Optional;

public interface CommentService {

    public List<Comment> getComment(Long boardNo);

    public void deleteComment(Long commentNo);

    public Comment writeComment(Comment comment);

    public Optional<Comment> getOneComment(Long commentNo);

    public Comment editComment(CommentEditRequest commentEditRequest);
}
