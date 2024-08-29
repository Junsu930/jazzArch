package jazz_arch_back.jazz_arch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
@EntityScan(basePackages = "jazz_arch_back.jazz_arch.dto")
public class JazzArchApplication {

	public static void main(String[] args) {
		SpringApplication.run(JazzArchApplication.class, args);
	}

}
