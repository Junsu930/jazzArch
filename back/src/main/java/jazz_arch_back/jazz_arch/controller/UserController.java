package jazz_arch_back.jazz_arch.controller;

import jazz_arch_back.jazz_arch.dto.LoginRequest;
import jazz_arch_back.jazz_arch.dto.Users;
import jazz_arch_back.jazz_arch.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/api/public/login")
    public ResponseEntity<?> doLogin(@RequestBody LoginRequest request){
        try {
            String token = userService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(token);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    @PostMapping("/api/public/doSignUp")
    public ResponseEntity<?>  doSignUp(@RequestBody Users user){
        try {
            logger.info(user.getNickname());
            Users savedUser = userService.doSignUp(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser); // 성공 시 저장된 사용자 반환
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("회원가입 중 오류가 발생했습니다."); // 실패 시 오류 메시지 반환
        }
    }

    @GetMapping("/api/public/getLoginData")
    public Users getLoginData(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        Users user = userService.findByEmail(email);
        return user;
    }

    @GetMapping("/api/public/check-email")
    public boolean checkEmail(String email){
        logger.info(email);
        Users user = userService.findByEmail(email);
        return user != null;
    }

    @GetMapping("/api/public/check-nickname")
    public boolean checkNickname(String nickname){
        Users user = userService.findByNickname(nickname);
        return user != null;
    }

}
