package com.bootcamp.apirest.exception;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ApiError {
    private final HttpStatus status;
    private final String message;
}
