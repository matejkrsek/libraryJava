package com.library.controller.advice;

import com.library.service.exceptions.DuplicateEmailException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
// @ControllerAdvice zajistí, že se metoda s anotací @ExceptionHandler v dan třídě zavolá,
// když v jakémkoli kontroleru dojde k dané výjimce

public class DuplicateEmailExceptionAdvice {

    @ExceptionHandler({DuplicateEmailException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public void handleEntityNotFoundException() {
    }

}