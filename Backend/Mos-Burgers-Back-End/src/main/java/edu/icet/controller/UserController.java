package edu.icet.controller;


import edu.icet.dto.User;
import edu.icet.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("get-user/{userId}/{password}")
    public boolean getUserPasswordValidation(@PathVariable String userId, @PathVariable String password) {
        return userService.getUserPasswordValidation(userId, password);
    }

    @GetMapping("get-user/{userId}")
    public User getUser(@PathVariable String userId) {
        return userService.getUser(userId);
    }


}
