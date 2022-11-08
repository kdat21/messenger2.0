import { Button } from "@mui/material";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import Form from "react-bootstrap/esm/Form";
import { Link, useNavigate } from "react-router-dom";
import { loadUser, loginUser } from "../../../store/features/auth/authSlice";
import { useAppDispatch } from "../../../store/hooks";
import {
  SLoginButton,
  SLoginForm,
  SLoginFormContainer,
  SLoginFormSecondaryText,
  SRegisterButton,
  SText,
} from "../../../styles/Auth/Login/LoginForm";
import AlertMessage from "../../layout/AlertMessage";

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Local state
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ type: "", message: "" });

  const { email, password } = loginForm;

  const onChangeLoginForm = (event: ChangeEvent<HTMLInputElement>) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);

      if (!loginData.success) {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert({ type: "", message: "" }), 5000);
      }
      else dispatch(loadUser())
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClickRegister = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()

    navigate('/register')
  }

  return (
    <SLoginFormContainer>
      <SText>
        Hang out <br />
        anytime, anywhere
      </SText>
      <SLoginFormSecondaryText>
        Messenger makes it easy and fun to stay close to your favorite people.
      </SLoginFormSecondaryText>
      <SLoginForm onSubmit={login}>
        <Form.Group className="my-2">
          <Form.Control
            type="email"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
        <AlertMessage info={alert} />
        {/* <SLoginButton type="submit">Log In</SLoginButton> */}
        <SLoginButton type="submit" variant='contained'>Log in</SLoginButton>
        <Link to="/"> Forgotten your password?</Link>
      </SLoginForm>
      <hr />
      <p>
        
          <SRegisterButton color='secondary' variant='contained' onClick={handleOnClickRegister}>Create new account</SRegisterButton>
      </p>
    </SLoginFormContainer>
  );
};

export default LoginForm;
