package jazz_arch_back.jazz_arch.service;

import jazz_arch_back.jazz_arch.dto.Board;
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
        return boardRepository.findAll(Sort.by(Sort.Direction.DESC, "boardNo"));
    }

    @Override
    public Optional<Board> getOneBoard(Long id) {
        return boardRepository.findById(id);
    }
}
