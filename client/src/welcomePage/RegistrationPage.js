import { apiPost, HttpRequestError } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";
import Button from "react-bootstrap/esm/Button";

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [errorMessageState, setErrorMessageState] = useState(null);
  const [valuesState, setValuesState] = useState({
    password: "",
    confirmPassword: "",
    email: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (valuesState.password !== valuesState.confirmPassword) {
      setErrorMessageState("Passwords dont match");
      return;
    }
    const { confirmPassword, ...registrationData } = valuesState;
    apiPost("/api/user", registrationData)
      .then(() => {
        navigate("/welcome/login");
      })
      .catch((e) => {
        if (e instanceof HttpRequestError && e.response.status === 400) {
          e.response.text().then((message) => setErrorMessageState(message));
          return;
        }
        setErrorMessageState("There was en error.");
      });
  };
  const handleBackClick = (e) => {
    navigate("/welcome");
  };
  const handleChange = (e) => {
    const fieldName = e.target.name;
    setValuesState({ ...valuesState, [fieldName]: e.target.value });
  };
  return (
    <div className="offset-4 col-sm-6 mt-5">
      <Button onClick={handleBackClick}>Back</Button>
      <h1>Registrace</h1>
      <form onSubmit={handleSubmit}>
        {errorMessageState ? (
          <FlashMessage
            theme={"danger"}
            text={errorMessageState}
          ></FlashMessage>
        ) : null}
        <InputField
          type="email"
          name="email"
          label="Your email"
          prompt="Your email"
          value={valuesState.email}
          handleChange={handleChange}
        />
        <InputField
          type="password"
          name="password"
          label="Your password"
          prompt="Your password"
          min={6}
          value={valuesState.password}
          handleChange={handleChange}
        />
        <InputField
          type="password"
          name="confirmPassword"
          label="Password again"
          prompt="Password once more"
          value={valuesState.confirmPassword}
          handleChange={handleChange}
        />
        <input
          type="submit"
          className="btn btn-primary mt-2"
          value="Registrate"
        />
      </form>
    </div>
  );
};
