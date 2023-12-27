package com.bootcamp.apirest.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserControllerAdvice {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiError> handleApiException(ApiException ex) {
        ApiError apiError = new ApiError(ex.getStatus(), ex.getMessage());
        return new ResponseEntity<>(apiError, ex.getStatus());
    }
}