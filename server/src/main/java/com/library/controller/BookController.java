package com.library.controller;

import com.library.dto.BookDTO;
import com.library.entity.BookFilter;
import com.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BookController {

    @Autowired
    public BookService bookService;

    @Secured("ROLE_ADMIN")
    @PostMapping({"/books/", "/books"})
    public BookDTO addBook(@RequestBody BookDTO bookDTO){
        return bookService.addBook(bookDTO);
    }

    // vrací knihy podle filtru
    @GetMapping({"/books", "/books/"})
    public List<BookDTO> getAllBook(BookFilter bookFilter){
        return bookService.getAllBooks(bookFilter);
    }

    @GetMapping({"/books/{id}", "/books/{id}/"})
    public BookDTO getBook(@PathVariable Long id) {
        return bookService.getBook(id);
    }

    @PutMapping({"/books/{id}", "/books/{id}/"})
    public BookDTO editBook(@RequestBody BookDTO bookDTO, @PathVariable long id){
        return bookService.editBook(bookDTO, id);
    }

    //mazat knihy může jen admin
    @Secured("ROLE_ADMIN")
    @DeleteMapping({"/books/{id}", "/books/{id}/"})
    public BookDTO removeBook(@PathVariable Long id){
        return bookService.removeBook(id);
    }
}