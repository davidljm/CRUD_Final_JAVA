package com.bootcamp.validationapi.service;

import com.bootcamp.validationapi.exception.InvalidDniFormatException;
import org.springframework.stereotype.Service;

@Service
public class DniValidationService {

    public void validateDniFormat(String dni) {
        // Verificar si el DNI tiene entre 7 y 8 dígitos y si son solo números.
        if (!dni.matches("\\d{7,8}")) {
            throw new InvalidDniFormatException("Invalid DNI format. It should have between 7 and 8 digits and contain only numbers.");
        }
    }
}
