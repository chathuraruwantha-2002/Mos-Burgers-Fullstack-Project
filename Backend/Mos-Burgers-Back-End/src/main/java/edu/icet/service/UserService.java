package edu.icet.service;

import edu.icet.dto.User;

public interface UserService {

    boolean getUserPasswordValidation(String userId, String password);

    User getUser(String userId);
}
