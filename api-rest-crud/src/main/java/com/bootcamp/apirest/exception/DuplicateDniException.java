package com.bootcamp.apirest.exception;


import org.springframework.http.HttpStatus;

public class DuplicateDniException extends ApiException {

    public DuplicateDniException(String dni) {
        super(HttpStatus.BAD_REQUEST, "There is a username registered with the DNI:: " + dni);
    }
}
