package jazz_arch_back.jazz_arch.service;

import jazz_arch_back.jazz_arch.dto.Board;
import jazz_arch_back.jazz_arch.dto.Comment;
import jazz_arch_back.jazz_arch.repository.BoardRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.SortedSet;

@Service
public class BoardServiceImpl implements BoardService {

    private BoardRepository boardRepository;
    public BoardServiceImpl(BoardRepository boardRepository){
        this.boardRepository = boardRepository;
    }
    @Override
    public List<Board> getAllBoard() {
        return boardRepository.findAll();
    }

    @Override
    public Optional<Board> getOneBoard(Long id) {
        return boardRepository.findById(id);
    }

    @Override
    public Board writeBoard(Board board) {
        return boardRepository.save(board);
    }

    @Override
    public void increaseViewCount(Long boardNo) {
        Board board = boardRepository.findById(boardNo)
                .orElseThrow(() -> new IllegalArgumentException("Invalid board ID"));

        board.setViewCount(board.getViewCount()+1);

        boardRepository.save(board);
    }


}
