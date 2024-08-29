package jazz_arch_back.jazz_arch.service;

import jazz_arch_back.jazz_arch.dto.Users;
import jazz_arch_back.jazz_arch.jwt.JwtAuthenticationResource;
import jazz_arch_back.jazz_arch.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    private JwtAuthenticationResource jwtAuthenticationResource;

    public UserServiceImpl(UserRepository userRepository, JwtAuthenticationResource jwtAuthenticationResource){
        this.userRepository = userRepository;
        this.jwtAuthenticationResource = jwtAuthenticationResource;
    }

    @Override
    public String login(String email, String password) {
        Users user = userRepository.findByEmail(email);

        if(user == null || !user.getPassword().equals(password) ){
            throw new IllegalArgumentException("Invalid email or password");
        }

        // Authentication 객체 생성
        var authentication = new Authentication() {
            @Override
            public List<SimpleGrantedAuthority> getAuthorities() {
                return List.of(new SimpleGrantedAuthority("ROLE_USER"));
            }
            @Override
            public Object getCredentials() {
                return password;
            }
            @Override
            public Object getDetails() {
                return null;
            }
            @Override
            public Object getPrincipal() {
                return user;
            }
            @Override
            public boolean isAuthenticated() {
                return true;
            }

            @Override
            public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
                // no-op
            }
            @Override
            public String getName() {
                return email;
            }
        };

        // JWT 토큰 생성
        return jwtAuthenticationResource.createToken(authentication);
    }

    @Override
    public Users findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Users findByNickname(String nickname) {
        return userRepository.findByNickname(nickname);
    }

    @Override
    public Users doSignUp(Users users) {
        return userRepository.save(users);
    }
}
