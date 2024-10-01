package jazz_arch_back.jazz_arch.service;

import jazz_arch_back.jazz_arch.dto.Comment;
import jazz_arch_back.jazz_arch.dto.CommentEditRequest;
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

    @Override
    public Comment editComment(CommentEditRequest commentEditRequest) {
// 1. commentNo로 댓글을 조회
        Optional<Comment> commentOptional = commentRepository.findById(commentEditRequest.getCommentNo());

        // 2. 댓글이 존재하는지 확인
        if (commentOptional.isPresent()) {
            Comment comment = commentOptional.get();

            // 3. 댓글 내용을 수정
            comment.setComment(commentEditRequest.getEditedComment());

            // 4. 수정된 댓글 저장
            return commentRepository.save(comment);
        } else {
            throw new RuntimeException("Comment not found with id: " + commentEditRequest.getCommentNo());
        }
    }
}
