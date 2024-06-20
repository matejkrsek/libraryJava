import FlashMessage from "../components/FlashMessage";
import InputField from "../components/InputField";
import { useEffect, useState } from "react";
import { useSession } from "../contexts/session";
import { useNavigate } from "react-router-dom";
import { apiPost, HttpRequestError } from "../utils/api";
import Button from "react-bootstrap/esm/Button";

export const LoginPage = () => {
  const [valuesState, setValuesState] = useState({ email: "", password: "" });
  const [errorMessageState, setErrorMessageState] = useState(null);
  const { session, setSession } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (session.data) {
      navigate("/books");
    }
  }, [session, navigate]);
  const handleChange = (e) => {
    const fieldName = e.target.name;
    setValuesState({ ...valuesState, [fieldName]: e.target.value });
  };
  const handleBackClick = (e) => {
    navigate("/welcome");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    apiPost("/api/auth", valuesState)
      .then((data) => setSession({ data, status: "authenticated" }))
      .catch((e) => {
        if (e instanceof HttpRequestError) {
          e.response.text().then((message) => setErrorMessageState(message));
          return;
        }
        setErrorMessageState("There was an error.");
      });
  };
  return (
    <div className="offset-4 col-sm-6 mt-5">
      <Button onClick={handleBackClick}>Back</Button>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        {errorMessageState ? (
          <FlashMessage
            theme={"danger"}
            text={errorMessageState}
          ></FlashMessage>
        ) : null}

        <InputField
          type="email"
          required={true}
          label="E-mail"
          handleChange={handleChange}
          value={valuesState.email}
          prompt="E-mail"
          name="email"
        />
        <InputField
          type="password"
          required={true}
          label="Password"
          handleChange={handleChange}
          value={valuesState.password}
          prompt={"Heslo"}
          name="password"
        />

        <input type="submit" className="btn btn-primary mt-2" value="Log in" />
      </form>
    </div>
  );
};
