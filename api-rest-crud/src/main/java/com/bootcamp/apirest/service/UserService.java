package com.bootcamp.apirest.service;

import com.bootcamp.apirest.model.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserByDni(Long dni);
    User saveUser(User user);
    User updateUser(Long dni, User newUser);
    void deleteUser(Long dni);

}
