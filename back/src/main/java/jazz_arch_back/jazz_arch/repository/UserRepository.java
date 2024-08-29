package jazz_arch_back.jazz_arch.repository;

import jazz_arch_back.jazz_arch.dto.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByEmail(String email);
    Users findByNickname(String nickname);
}
