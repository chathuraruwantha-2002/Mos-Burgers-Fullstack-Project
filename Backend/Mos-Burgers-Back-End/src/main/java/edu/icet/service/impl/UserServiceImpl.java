package edu.icet.service.impl;

import edu.icet.dto.User;
import edu.icet.entity.UserEntity;
import edu.icet.repository.UserRepository;
import edu.icet.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper mapper;

    @Override
    public boolean getUserPasswordValidation(String userId, String password) {
        UserEntity User = userRepository.findByEmail(userId);
        if(User!=null){
            return User.getPassword().equals(password);
        }
        return false;
    }

    @Override
    public User getUser(String userId) {
        UserEntity User = userRepository.findByEmail(userId);
        if(User!=null){
            return mapper.map(User, User.class);
        }
        return null;
    }
}
