package jazz_arch_back.jazz_arch.service;

import jazz_arch_back.jazz_arch.dto.Users;

public interface UserService {
    public String login(String email, String password);
    public Users findByEmail(String email);
    public Users findByNickname(String nickname);
    public Users doSignUp(Users users);
}
