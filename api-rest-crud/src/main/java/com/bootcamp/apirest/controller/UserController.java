package com.bootcamp.apirest.controller;

import com.bootcamp.apirest.exception.*;
import com.bootcamp.apirest.model.User;
import com.bootcamp.apirest.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin({"http://localhost:3000", "http://localhost:8081"})
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/users")
    public ResponseEntity<Object> newUser(@Valid @RequestBody User newUser) {
        try {
            User savedUser = userService.saveUser(newUser);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (DuplicateDniException e) {
            return new ResponseEntity<>(new ApiError(HttpStatus.BAD_REQUEST, e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{dni}")
    public Optional<User> getUserByDni(@PathVariable Long dni) {
        return userService.getUserByDni(dni);
    }

    @PutMapping("/users/{dni}")
    public User updateUser(@RequestBody User newUser, @PathVariable Long dni) {
        return userService.updateUser(dni, newUser);
    }

    @DeleteMapping("/users/{dni}")
    public ResponseEntity<String> deleteUser(@PathVariable Long dni) {
        userService.deleteUser(dni);
        return new ResponseEntity<>("User with DNI " + dni + " deleted successfully", HttpStatus.OK);
    }
}
