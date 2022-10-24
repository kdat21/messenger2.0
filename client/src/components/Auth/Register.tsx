import { ChangeEvent, FormEvent, useState } from "react";
import Form from "react-bootstrap/esm/Form";
import { Link } from "react-router-dom";
import { loadUser, registerUser } from "../../store/features/auth/authSlice";
import { useAppDispatch } from "../../store/hooks";
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
  const dispatch = useAppDispatch()

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

      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => setAlert({ type: "", message: "" }), 5000);
      }
      else dispatch(loadUser())
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
