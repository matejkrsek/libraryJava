package com.library.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class BookDTO {

    @NotNull
    @JsonProperty("_id")
    private long id;

    @NotBlank
    private String name;

    @NotNull
    private boolean reserved;

    @NotBlank
    private String reservedBy;

    @NotBlank
    private String borrowedTo;

    @NotBlank
    private String author;

    @NotNull
    @Positive
    private Integer year;


}
