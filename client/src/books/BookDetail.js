import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import Button from "react-bootstrap/esm/Button";
import { useSession } from "../contexts/session";

const BookDetail = () => {
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  const { session } = useSession();
  const { id } = useParams();

  const isAdmin = session.data?.isAdmin === true;

  useEffect(() => {
    apiGet("/api/books/" + id)
      .then((data) => {
        console.log(data);
        setBook({
          name: data.name,
          year: data.year,
          author: data.author,
          reserved: data.reserved,
          reservedBy: data.reservedBy,
          borrowedTo: data.borrowedTo,
          onStock: data.onStock,
          dateAdded: data.dateAdded,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleBackClick = (e) => {
    navigate("/books");
  };

  return (
    <div>
      <h1>Information about book</h1>
      <hr />
      <h3>
        {book.name} <small>({book.year})</small>
      </h3>

      <p>
        <strong>Author: </strong>
        {book.author}
        <br />

        <strong>Available to reserve </strong>
        {book.reserved ? "NO" : "YES"}
        <br />
        {isAdmin && book.reservedBy && (
          <>
            <strong>Book is reserved by: </strong>
            {book.reservedBy}
            <br />
          </>
        )}
        {isAdmin && book.borrowedTo && (
          <>
            <strong>Book is borrowed to: </strong>
            {book.borrowedTo}
            <br />
          </>
        )}
      </p>
      <Button
        style={{ marginTop: "5px" }}
        className="btn btn-secondary"
        onClick={handleBackClick}
      >
        Back
      </Button>
    </div>
  );
};

export default BookDetail;
