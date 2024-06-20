import { useEffect, useState } from "react";
import { useSession } from "../contexts/session";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button"; // Ensure correct import for Bootstrap Button

export const WelcomePage = () => {
  const { session, setSession } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session.data) {
      navigate("/books");
    }
  }, [session, navigate]);

  const handleLoginClick = () => {
    navigate("/welcome/login");
  };

  const handleRegisterClick = () => {
    navigate("/welcome/registration");
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100 justify-content-center align-items-start">
        <div className="text-center mt-5">
          <h1>Welcome to the Library of Saint Luiana</h1>
          <h3>To continue, log in or register please:</h3>
          <Button
            style={{ marginTop: "5px", marginRight: "10px" }}
            className="btn btn-secondary"
            onClick={handleLoginClick}
          >
            Log in
          </Button>
          <Button
            style={{ marginTop: "5px" }}
            className="btn btn-secondary"
            onClick={handleRegisterClick}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};
