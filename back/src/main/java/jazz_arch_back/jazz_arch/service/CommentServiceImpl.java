package jazz_arch_back.jazz_arch.service;

import jazz_arch_back.jazz_arch.dto.Comment;
import jazz_arch_back.jazz_arch.repository.ClubRepository;
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
}
