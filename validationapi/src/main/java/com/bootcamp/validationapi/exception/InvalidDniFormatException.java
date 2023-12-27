package com.bootcamp.validationapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidDniFormatException extends RuntimeException {

    public InvalidDniFormatException(String message) {
        super(message);
    }
}
