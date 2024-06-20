import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import InputField from "../components/InputField";

import { apiGet, apiPost, apiPut } from "../utils/api";

import { useSession } from "../contexts/session";
import Button from "react-bootstrap/esm/Button";

const BookForm = () => {
  // parametr url adresy (id filmu), stejně jako v detailu filmu
  const { id } = useParams();
  const { session } = useSession();
  const isAdmin = session.data?.isAdmin === true;
  const isLoadingSession = session.status === "loading";
  useEffect(() => {
    if (!isAdmin && !isLoadingSession) {
      if (id) {
        navigate("/books/show/" + id);
      } else {
        navigate("/books");
      }
    }
  }, [isAdmin, isLoadingSession, id]);
  const navigate = useNavigate();

  const [bookNameState, setBookName] = useState("");
  const [yearState, setYear] = useState(0);
  const [authorState, setAuthor] = useState("");
  const [availableState, setAvailable] = useState(false);
  const [sentState, setSent] = useState(false);
  const [successState, setSuccess] = useState(false);
  const [errorState, setError] = useState();

  const handleChange = (e) => {
    const target = e.target;

    let temp;
    if (target.name === "available") {
      temp = target.checked;
    } else {
      temp = target.value;
    }

    const name = target.name;
    const value = temp;

    if (name === "bookName") {
      console.log(value);
      setBookName(value);
    } else if (name === "year") {
      console.log(value);
      setYear(value);
    }
    //else if (name === "available") {
    //console.log(value);
    //setAvailable(value);
    //}
    else if (name === "author") {
      console.log(value);
      setAuthor(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      name: bookNameState,
      year: yearState,
      author: authorState,
      onStock: true,
      reserved: false,
    };

    (id ? apiPut("/api/books/" + id, body) : apiPost("/api/books/", body))
      .then((data) => {
        console.log("succcess", data);
        setSent(true);
        setSuccess(true);
        navigate("/books");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        setSent(true);
        setSuccess(false);
      });
  };

  const handleBackClick = (e) => {
    navigate("/books");
  };

  useEffect(() => {
    if (id) {
      apiGet("/api/books/" + id).then((data) => {
        setBookName(data.name);
        setYear(data.year);
        setAuthor(data.author);
      });
    }
  }, [id]);

  if (!isAdmin) {
    console.log(session, session.data?.isAdmin, isAdmin);
    return (
      <div className="d-flex justify-content-center mt-2">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>{id ? "Edit" : "Add new"} book</h1>
      <hr />

      <form onSubmit={handleSubmit}>
        <InputField
          required={true}
          type="text"
          name="bookName"
          min="3"
          label="Name"
          prompt="Book name"
          value={bookNameState}
          handleChange={handleChange}
        />

        <InputField
          required={true}
          type="text"
          name="author"
          min="3"
          label="Author"
          prompt="Name of the author"
          value={authorState}
          handleChange={handleChange}
        />

        <InputField
          required={true}
          type="number"
          name="year"
          label="Published in year:"
          prompt="year the book was published"
          min="0"
          value={yearState}
          handleChange={handleChange}
        />

        <input
          type="submit"
          style={{ marginTop: "10px" }}
          className="btn btn-success"
          value="Save"
        />
        <Button
          style={{ marginLeft: "10px", marginTop: "10px" }}
          className="btn btn-secondary"
          onClick={handleBackClick}
        >
          Back
        </Button>
      </form>
    </div>
  );
};

export default BookForm;
