package jazz_arch_back.jazz_arch.service;

import jazz_arch_back.jazz_arch.dto.Comment;
import jazz_arch_back.jazz_arch.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    private CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository){
        this.commentRepository = commentRepository;
    }
    @Override
    public List<Comment> getComment(Long id) {
        return commentRepository.findByBoardNoWithAuthor(id);
    }

    @Override
    public void deleteComment(Long commentNo) {
        commentRepository.deleteByCommentNo(commentNo);
    }

    @Override
    public Comment writeComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public Optional<Comment> getOneComment(Long commentNo) {
        return commentRepository.findById(commentNo);
    }
}
