package jazz_arch_back.jazz_arch.service;

import jazz_arch_back.jazz_arch.dto.ClubList;
import jazz_arch_back.jazz_arch.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubServiceImpl implements ClubService {

    private ClubRepository clubRepository;

    @Autowired
    public ClubServiceImpl(ClubRepository clubRepository){
        this.clubRepository = clubRepository;
    }
    @Override
    public List<ClubList> findAll() {
        return clubRepository.findAll();
    }
}
