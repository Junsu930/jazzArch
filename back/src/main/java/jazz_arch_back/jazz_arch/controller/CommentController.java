package jazz_arch_back.jazz_arch.controller;

import jazz_arch_back.jazz_arch.dto.Comment;
import jazz_arch_back.jazz_arch.service.CommentService;
import jazz_arch_back.jazz_arch.service.CommentServiceImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class CommentController {

    private CommentService commentService;
    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }

    @GetMapping("/api/public/getComment/{boardNo}")
    public List<Comment> getComment(@PathVariable("boardNo") Long boardNo){
        return commentService.getComment(boardNo);
    }

}
