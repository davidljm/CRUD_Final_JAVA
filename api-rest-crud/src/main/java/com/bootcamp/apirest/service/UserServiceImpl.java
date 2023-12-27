package com.bootcamp.apirest.service;

import com.bootcamp.apirest.exception.DuplicateDniException;
import com.bootcamp.apirest.exception.UserNotFoundException;
import com.bootcamp.apirest.model.User;
import com.bootcamp.apirest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserByDni(Long dni) {
        Optional<Optional<User>> userOptional = Optional.ofNullable(userRepository.findByDni(dni));
        return userOptional.orElseThrow(() -> new UserNotFoundException(dni));
    }

    @Override
    public User saveUser(User user) {
        Long dni = user.getDni();
        userRepository.findByDni(dni).ifPresent(existingUser -> {
            if (!existingUser.equals(user)) {
                throw new DuplicateDniException(dni.toString());
            }
        });

        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long dni, User newUser) {
        return userRepository.findByDni(dni)
                .map(user -> {
                    user.setFirst_name(newUser.getFirst_name());
                    user.setLast_name(newUser.getLast_name());
                    user.setJob(newUser.getJob());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new UserNotFoundException(dni));
    }


    @Override
    public void deleteUser(Long dni) {
        if (!userRepository.existsById(dni)) {
            throw new UserNotFoundException(dni);
        }
        userRepository.deleteById(dni);
    }



}
