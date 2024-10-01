package jazz_arch_back.jazz_arch.controller;

import jakarta.transaction.Transactional;
import jazz_arch_back.jazz_arch.dto.*;
import jazz_arch_back.jazz_arch.repository.BoardRepository;
import jazz_arch_back.jazz_arch.repository.UserRepository;
import jazz_arch_back.jazz_arch.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class CommentController {

    private CommentService commentService;
    private BoardRepository boardRepository;
    private UserRepository userRepository;

    public CommentController(CommentService commentService, BoardRepository boardRepository, UserRepository userRepository){
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
        this.commentService = commentService;
    }

    @GetMapping("/api/public/getComment/{boardNo}")
    public List<Comment> getComment(@PathVariable("boardNo") Long boardNo){
        return commentService.getComment(boardNo);
    }

    @GetMapping("/api/public/getOneComment/{commentNo}")
    public Optional<Comment> getOneComment(@PathVariable("commentNo") Long commentNo){
        return commentService.getOneComment(commentNo);
    }

    @PostMapping("/api/public/writeComment")
    public ResponseEntity<?> writeComment(@RequestBody CommentRequest commentRequest) {
        try {
            // boardNo와 authorId로 각각의 엔티티를 조회
            Board board = boardRepository.findById(commentRequest.getBoardNo())
                    .orElseThrow(() -> new Exception("해당 게시판이 없습니다"));

            Users author = userRepository.findById(commentRequest.getAuthorId())
                    .orElseThrow(() -> new Exception("해당 유저가 없습니다."));

            Comment comment = new Comment();
            comment.setComment(commentRequest.getComment());
            comment.setBoard(board);
            comment.setAuthor(author);

            Comment savedComment = commentService.writeComment(comment);

            // 성공적으로 저장된 경우 OK 응답 반환
            return ResponseEntity.ok(savedComment);

        } catch (Exception e) {
            // 예외가 발생한 경우, BAD_REQUEST와 함께 에러 메시지 반환
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("댓글 작성 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    @PutMapping("/api/public/editComment")
    public Comment editComment(@RequestBody CommentEditRequest commentEditRequest){
        return commentService.editComment(commentEditRequest);
    }

    @DeleteMapping("/api/public/deleteComment/{commentNo}")
    @Transactional
    public ResponseEntity<String> deleteComment(@PathVariable Long commentNo){
        try{
            commentService.deleteComment(commentNo);
            return ResponseEntity.ok("댓글이 삭제되었습니다.");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류가 발생하였습니다.");
        }
    }

}
