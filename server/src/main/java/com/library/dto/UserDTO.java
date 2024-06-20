package com.library.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDTO {

    @JsonProperty("_id")
    private long userId;

    @Email
    private String email;

    @NotBlank(message = "Fill in the password")
    @Size(min = 7, message = "Password has to be more than 7 characters")
    private String password;

    @JsonProperty("isAdmin")
    private boolean admin;

}