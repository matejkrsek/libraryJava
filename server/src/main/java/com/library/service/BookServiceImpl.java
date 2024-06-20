package com.library.service;

import com.library.dto.BookDTO;
import com.library.dto.mapper.BookMapper;
import com.library.entity.BookEntity;
import com.library.entity.BookFilter;
import com.library.entity.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookMapper bookMapper;

    public BookDTO addBook(BookDTO bookDTO){
        BookEntity book = bookMapper.toEntity(bookDTO);

        BookEntity saved = bookRepository.save(book);
        return bookMapper.toDTO(saved);
    }

    public BookDTO getBook(Long id) {
        BookEntity book = bookRepository.getReferenceById(id);
        return bookMapper.toDTO(book);
    }
    public BookDTO editBook(BookDTO bookDTO, long id){
        bookDTO.setId(id);
        BookEntity entity = bookRepository.getReferenceById(id);
        bookMapper.updateEntity(bookDTO, entity);
        BookEntity saved = bookRepository.save(entity);
        return bookMapper.toDTO(saved);
    }

    public BookDTO removeBook(Long id){
        // pokud ID neexistuje, vyhodí výjimku...
        BookEntity book = bookRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        BookDTO model = bookMapper.toDTO(book);
        bookRepository.delete(book);
        return model;
    }

    public List<BookDTO> getAllBooks(BookFilter bookFilter) {
        List<BookDTO> result = new ArrayList<>();
        // na základě filtrů z atributu zobrazí dané filmy na stránku...
        for(BookEntity book : bookRepository.getFilteredBooks(bookFilter, PageRequest.of(0, bookFilter.getLimit()))) {
            result.add(bookMapper.toDTO(book));
        }
        return result;
    }

}
