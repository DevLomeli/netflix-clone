import "./index.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/reducers/authReducer";

import { IHeaderProps } from "../../interfaces";

const Header: React.FC<IHeaderProps> = ({ setSignIn }) => {
  const user: object | null = useSelector(selectAuth);
  const [showHeader, setShowHeader] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);

  const renderAction = () => {
    if (!user) {
      return (
        <Link
          to="/login"
          className="header__signinButton button button--primary"
          onClick={setSignIn}
        >
          Sign in
        </Link>
      );
    }
    return (
      <Link to="/profile">
        <img
          className="header__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="avatar"
        />
      </Link>
    );
  };

  return (
    <header className={`header ${showHeader && "header--black"}`}>
      <div className="header__content">
        <Link to="/" className="header__logo">
          <img
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt="netflix logo"
          />
        </Link>
        {renderAction()}
      </div>
    </header>
  );
};

export default Header;
