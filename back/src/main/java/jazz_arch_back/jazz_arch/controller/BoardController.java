package jazz_arch_back.jazz_arch.controller;

import jazz_arch_back.jazz_arch.dto.Board;
import jazz_arch_back.jazz_arch.dto.Users;
import jazz_arch_back.jazz_arch.service.BoardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class BoardController {

    private  BoardService boardService;

    public BoardController(BoardService boardService) {this.boardService = boardService;}

    @GetMapping("/api/public/getAllBoard")
    public List<Board> getAllBoard(){
        return boardService.getAllBoard();}

    @GetMapping("/api/public/getOneBoard/{boardId}")
    public Optional<Board> getOneBoard(@PathVariable("boardId")Long boardId){return boardService.getOneBoard(boardId);}


    @PostMapping("/api/public/writeBoard")
    public Board writeBoard(@RequestBody Board board){
        return boardService.writeBoard(board);
    }
}
