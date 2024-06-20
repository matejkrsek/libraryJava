package com.library.entity;

import lombok.Data;

@Data
public class BookFilter {

    private String text = "";
    private Integer fromYear;
    private Integer toYear;
    private Integer limit = 10;

}