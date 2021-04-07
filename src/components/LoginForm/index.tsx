import "./index.css";
import { SyntheticEvent, useRef, useState } from "react";
import { auth } from "../../firebase";

const LoginForm = () => {
  const [errorAuth, setErrorAuth] = useState<string>("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      )
      .then((authUser) => {})
      .catch((e) => {
        setErrorAuth(e.message);
      });
  };

  const registerHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((e) => {
        setErrorAuth(e.message);
      });
  };

  const cleanErrorMessage = () => {
    setErrorAuth("");
  };

  return (
    <form className="loginForm" onSubmit={submitHandler}>
      <h1>Sign in</h1>
      <input
        type="email"
        placeholder="Email"
        ref={emailRef}
        onFocus={cleanErrorMessage}
      />
      <input
        type="password"
        placeholder="Password"
        ref={passwordRef}
        onFocus={cleanErrorMessage}
      />
      {errorAuth && <small className="text--error">{errorAuth}</small>}
      <button type="submit" className="button button--primary">
        Sign In
      </button>
      <h4>
        <span className="text--gray">New to Netflix?</span>{" "}
        <span className="text--link" onClick={registerHandler}>
          Sign Up now.
        </span>
      </h4>
    </form>
  );
};

export default LoginForm;
