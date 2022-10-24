import { ChangeEvent, FormEvent, useState } from "react";
import Form from "react-bootstrap/esm/Form";
import { Link } from "react-router-dom";
import { loadUser, loginUser } from "../../../store/features/auth/authSlice";
import { useAppDispatch } from "../../../store/hooks";
import {
  SLoginButton,
  SLoginForm,
  SLoginFormContainer,
  SLoginFormSecondaryText,
  SLoginFormText,
  SRegisterButton,
} from "../../../styles/Auth/Login/LoginForm";
import AlertMessage from "../../layout/AlertMessage";

const LoginForm = () => {
  const dispatch = useAppDispatch()

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

  return (
    <SLoginFormContainer>
      <SLoginFormText>
        Hang out <br />
        anytime, anywhere
      </SLoginFormText>
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
        <SLoginButton type="submit">Log In</SLoginButton>
        <Link to="/"> Forgotten your password?</Link>
      </SLoginForm>
      <hr />
      <p>
        <Link to="/register">
          <SRegisterButton>Create new account</SRegisterButton>
        </Link>
      </p>
    </SLoginFormContainer>
  );
};

export default LoginForm;
