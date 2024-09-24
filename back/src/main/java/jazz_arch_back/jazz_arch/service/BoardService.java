package jazz_arch_back.jazz_arch.service;

import jazz_arch_back.jazz_arch.dto.Board;
import jazz_arch_back.jazz_arch.dto.Comment;

import java.util.List;
import java.util.Optional;

public interface BoardService {
    public List<Board> getAllBoard();

    public Optional<Board> getOneBoard(Long boardId);

    public Board writeBoard(Board board);

}
