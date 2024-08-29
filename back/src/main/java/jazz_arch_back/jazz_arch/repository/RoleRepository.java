package jazz_arch_back.jazz_arch.repository;

import jazz_arch_back.jazz_arch.dto.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Role findByName(String name);
}
