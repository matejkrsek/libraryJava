import React from "react";
import { Link } from "react-router-dom";
import { useSession } from "../contexts/session";

const BookTable = ({
  items,
  deleteBook,
  cancelReservation,
  retrieveBook,
  giveBook,
  reserveBook,
}) => {
  const { session } = useSession();

  const isAdmin = session.data?.isAdmin === true;
  const userEmail = session.data?.email;

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Published</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.year}</td>
              <td>
                <div className="btn-group">
                  <Link
                    to={"/books/show/" + item._id}
                    className="btn btn-sm btn-info"
                  >
                    Show
                  </Link>
                  {isAdmin && (
                    <>
                      <Link
                        to={"/books/edit/" + item._id}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteBook(item._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {!item.reserved && userEmail && (
                    <button
                      onClick={() => reserveBook(item, userEmail)}
                      className="btn btn-sm btn-success"
                    >
                      Reserve the book
                    </button>
                  )}

                  {isAdmin && item.reservedBy && (
                    <button
                      onClick={() => giveBook(item)}
                      className="btn btn-sm btn-success"
                    >
                      Give out
                    </button>
                  )}

                  {isAdmin && item.borrowedTo && (
                    <button
                      onClick={() => retrieveBook(item)}
                      className="btn btn-sm btn-secondary"
                    >
                      Retrieve the book
                    </button>
                  )}

                  {item.reservedBy === userEmail && (
                    <button className="btn btn-sm btn-secondary">
                      I reserved this book
                    </button>
                  )}

                  {(item.reservedBy === userEmail ||
                    (isAdmin && item.reservedBy)) && (
                    <button
                      onClick={() => cancelReservation(item)}
                      className="btn btn-sm btn-danger"
                    >
                      Cancel the reservation
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAdmin && (
        <Link to={"/books/create"} className="btn btn-success">
          New book
        </Link>
      )}
    </div>
  );
};

export default BookTable;
