import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Form from "react-bootstrap/esm/Form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import {
  SContainer,
  SLoginButton,
  SRegisterButton,
  SRegisterForm,
  SSecondText,
  SText,
} from "../../styles/Auth/Register/Register";
import { AuthStateType } from "../../types";
import AlertMessage from "../layout/AlertMessage";

const Register = () => {
  // Context
  const { registerUser } = useContext(AuthContext) as AuthStateType;

  // Local state
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { email, username, password, confirmPassword } = registerForm;

  const [alert, setAlert] = useState({ type: "", message: "" });

  const onChangeRegisterForm = (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const register = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Passwords do not match" });
      setTimeout(() => setAlert({ type: "", message: "" }), 5000);
      return;
    }

    try {
      const registerData = await registerUser({ email, username, password });

      setAlert({
        type: registerData.success ? "success" : "danger",
        message: registerData.message,
      });
      setTimeout(() => setAlert({ type: "", message: "" }), 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SContainer>
      <SText>Sign up!</SText>
      <SSecondText>It's quick and easy</SSecondText>
      <SRegisterForm onSubmit={register}>
        <Form.Group className="my-2">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChangeRegisterForm}
            required
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChangeRegisterForm}
            required
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeRegisterForm}
            required
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChangeRegisterForm}
            required
          />
        </Form.Group>
        <AlertMessage info={alert} />
        <SRegisterButton type="submit">Register</SRegisterButton>
      </SRegisterForm>
      <hr />
      <SSecondText>
        Already have an account?
        <Link to="/">
          <SLoginButton>Login</SLoginButton>
        </Link>
      </SSecondText>
    </SContainer>
  );
};

export default Register;
