package jazz_arch_back.jazz_arch.controller;

import jazz_arch_back.jazz_arch.dto.ClubList;
import jazz_arch_back.jazz_arch.service.ClubService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ClubController {
    private Logger logger = LoggerFactory.getLogger(getClass());
    private final ClubService service;

    @Autowired
    public ClubController(ClubService service) {
        this.service = service;
    }

    @GetMapping("/api/public/getClub")
    public List<ClubList> getAllClubs(){
        return service.findAll();
    }

    @GetMapping("/api/public/getRegion")
    public List<ClubList> getAllRegion(){
        return service.findAll();
    }

}
