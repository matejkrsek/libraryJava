import React, { useState, useEffect } from "react";
import { apiDelete, apiGet, apiPut } from "../utils/api";
import BookTable from "./BookTable";
import BookFilter from "./BookFilter";

const BookIndex = () => {
  const [booksState, setBooks] = useState([]);
  const [filterState, setFilter] = useState({
    text: undefined,
    fromYear: undefined,
    toYear: undefined,
    limit: undefined,
  });

  useEffect(() => {
    apiGet("/api/books").then((data) => setBooks(data));
  }, []);

  const deleteBook = async (id) => {
    await apiDelete("/api/books/" + id);
    setBooks(booksState.filter((book) => book._id !== id));
    window.location.reload();
  };

  const giveBook = async (item) => {
    // knihvník vydá rezervovanou knihu
    item.borrowedTo = item.reservedBy;
    item.reservedBy = "";
    await apiPut("/api/books/" + item._id, item);
    window.location.reload();
  };

  const reserveBook = async (item, email) => {
    // osoba si rezervuje knihu
    item.reserved = true; // funguje?
    item.reservedBy = email;
    console.log(item);
    await apiPut("/api/books/" + item._id, item);
    window.location.reload();
  };

  const retrieveBook = async (item) => {
    // osoba vrací knihu do knihovny
    item.borrowedTo = "";
    item.reserved = false;
    await apiPut("/api/books/" + item._id, item);
    window.location.reload();
  };

  const cancelReservation = async (item) => {
    item.reserved = false;
    item.reservedBy = "";
    await apiPut("/api/books/" + item._id, item);
    window.location.reload();
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    // pokud vybereme prázdnou hodnotu (máme definováno jako true/false/'' v komponentách), nastavíme na undefined
    if (
      e.target.value === "false" ||
      e.target.value === "true" ||
      e.target.value === ""
    ) {
      setFilter((prevState) => {
        return { ...prevState, [e.target.name]: undefined };
      });
    } else {
      setFilter((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = filterState;

    const data = await apiGet("/api/books", params);
    setBooks(data);
  };

  return (
    <div>
      <h1>List of books</h1>
      <hr />
      <BookFilter
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        filter={filterState}
        confirm="Filter books"
      />
      <hr />
      <BookTable
        deleteBook={deleteBook}
        giveBook={giveBook}
        reserveBook={reserveBook}
        retrieveBook={retrieveBook}
        cancelReservation={cancelReservation}
        items={booksState}
      />
    </div>
  );
};

export default BookIndex;
