package jazz_arch_back.jazz_arch.controller;

import jazz_arch_back.jazz_arch.dto.Board;
import jazz_arch_back.jazz_arch.service.BoardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class BoardController {

    private  BoardService boardService;

    public BoardController(BoardService boardService) {this.boardService = boardService;}

    @GetMapping("/api/public/getAllBoard")
    public List<Board> getAllBoard(){return boardService.getAllBoard();}

    @GetMapping("/api/public/getOneBoard/{boardId}")
    public Optional<Board> getOneBoard(@PathVariable("boardId")Long boardId){return boardService.getOneBoard(boardId);}

}
