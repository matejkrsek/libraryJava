import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";

import BookIndex from "./books/BookIndex";
import BookDetail from "./books/BookDetail";
import BookForm from "./books/BookForm";
import { RegistrationPage } from "./welcomePage/RegistrationPage";
import { useSession } from "./contexts/session";
import { apiDelete } from "./utils/api";
import { LoginPage } from "./welcomePage/LoginPage";
import { WelcomePage } from "./welcomePage/WelcomePage";

function NavigationBar() {
  const { session, setSession } = useSession();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    apiDelete("/api/auth").finally(() => {
      setSession({ data: null, status: "unauthorized" });
      navigate("/welcome");
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          {session.data && (
            <Link to={"/books"} className="nav-link">
              Books
            </Link>
          )}
        </li>
      </ul>

      <ul className="navbar-nav align-items-center gap-2">
        {session.data ? (
          <>
            <li className="nav-item">{session.data.email}</li>
            <li className="nav-item">
              <button
                className="btn btn-sm btn-secondary"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </li>
          </>
        ) : session.status === "loading" ? (
          <>
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to={"/welcome/registration"}>Registration</Link>
            </li>
            <li className="nav-item">
              <Link to={"/welcome/login"}>Log in</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export function App() {
  return (
    <Router>
      <div className="container">
        <NavigationBar />
        <Routes>
          <Route index element={<Navigate to={"/welcome"} />} />
          <Route path="/books">
            <Route index element={<BookIndex />} />
            <Route path="show/:id" element={<BookDetail />} />
            <Route path="create" element={<BookForm />} />
            <Route path="edit/:id" element={<BookForm />} />
          </Route>
          <Route path="/welcome">
            <Route index element={<WelcomePage />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
