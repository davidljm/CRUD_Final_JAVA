package com.bootcamp.apirest.exception;
import org.springframework.http.HttpStatus;

public class UserNotFoundException extends ApiException {

    public UserNotFoundException(Long dni) {
        super(HttpStatus.NOT_FOUND, "User not found with DNI: " + dni);
    }
}