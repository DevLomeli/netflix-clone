import "./index.css";
import { useState } from "react";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";

const LoginPage = () => {
  const [signIn, setSignIn] = useState<boolean>(false);

  const renderContent = () => {
    if (signIn) {
      return <LoginForm />;
    }
    return (
      <>
        <h1>Unlimited films, TV programmes and more.</h1>
        <h2>Watch anywhere. Cancel at any time.</h2>
        <h3>
          Ready to watch? Enter your email to create or restart your membership.
        </h3>
        <div className="login__input">
          <form>
            <input type="email" placeholder="Email Address" />
            <button
              onClick={() => setSignIn(true)}
              className="login__button button button--primary"
            >
              get started
            </button>
          </form>
        </div>
      </>
    );
  };

  return (
    <div className="login">
      <div className="login__background">
        <Header setSignIn={() => setSignIn(!signIn)} />
        <div className="login__gradient"></div>
        <div className="login__content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default LoginPage;
