package com.library.service;

import com.library.dto.BookDTO;
import com.library.entity.BookFilter;

import java.util.List;

// podobné abstraktní třídě... zde uvádím jen obecné předpisy, jejich implementaci v BookServiceImpl
public interface BookService {

    BookDTO addBook(BookDTO bookDTO);
    BookDTO getBook(Long id);
    BookDTO editBook(BookDTO bookDTO, long id);
    BookDTO removeBook(Long id);

    List<BookDTO> getAllBooks(BookFilter bookFilter);
}
