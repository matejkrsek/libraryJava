package com.library.entity.repository;

import com.library.entity.BookEntity;
import com.library.entity.BookFilter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface BookRepository extends PagingAndSortingRepository<BookEntity, Long>, JpaRepository<BookEntity, Long> {

// Tady pomohl ChatGPT, SQL moc neovládám...
// zkontroluje, které filtry jsou v BookFiltru(pozažmo v URL) zadány (a nemají jen výchozí hodnotu).
// Pokud je filtr zadaný, vyhodnotí se podmínka za OR a výsledky se vyfiltrují

    @Query(value = "SELECT m FROM book m WHERE" +
            "    (:#{#filter.getFromYear()} is null OR m.year >= :#{#filter.getFromYear()}) " +
            "AND (:#{#filter.getToYear()} is null OR m.year <= :#{#filter.getToYear()})  "
    )
    List<BookEntity> getFilteredBooks(BookFilter filter, Pageable pageable);
}
