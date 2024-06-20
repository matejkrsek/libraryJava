package com.library.controller;

import com.library.dto.UserDTO;
import com.library.entity.UserEntity;
import com.library.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping({"/user", "/user/"}) // @Valid --> musí splňovat UserDTO formát = např. heslo musí mít aspoň 6 znaků
    public UserDTO addUser(@RequestBody @Valid UserDTO userDTO) {
        return userService.create(userDTO);
    }

    @PostMapping({"/auth", "/auth/"})
    //HttpServletRequest == objekt, který spravuje session, obsahuje metodu login(),
    //která ověří, zda uživatel zadal správné přihlašovací údaje

    public UserDTO login(@RequestBody @Valid UserDTO userDTO, HttpServletRequest req) throws ServletException {
        req.login(userDTO.getEmail(), userDTO.getPassword());

        //Po přihlášení získáme aktuálně přihlášeného uživatele, vrací to, co se používá dále...
        UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserDTO model = new UserDTO();
        model.setEmail(user.getEmail());
        model.setUserId(user.getUserId());
        model.setAdmin(user.isAdmin());
        return model;
    }

    @DeleteMapping({"/auth", "/auth/"})
    public String logout(HttpServletRequest req) throws ServletException {
        req.logout();
        return "User logged out";
    }

    @GetMapping("/auth")
    public UserDTO getCurrentUser() throws ServletException {
        try {
            UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            UserDTO model = new UserDTO();
            model.setEmail(user.getEmail());
            model.setUserId(user.getUserId());
            model.setAdmin(user.isAdmin());
            return model;
        } catch (ClassCastException e) { // pokud např. není nikdo přihlášený, vrací exception
            throw new ServletException();
        }
    }

    // lokální exception
    @ExceptionHandler(ServletException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public void handleServletException() {
    }
}

