package com.library.dto.mapper;

import com.library.dto.BookDTO;
import com.library.entity.BookEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BookMapper {


    BookDTO toDTO(BookEntity source);

    BookEntity toEntity(BookDTO source);

    BookEntity updateEntity(BookDTO source, @MappingTarget BookEntity target);
    // existující entitu můžeme mapperu předat v parametru, který označíme anotací @MappingTarget




}