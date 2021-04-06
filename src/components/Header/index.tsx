import "./index.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
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

  return (
    <header className={`header ${showHeader && "header--black"}`}>
      <div className="header__content">
        <Link to="/" className="header__logo">
          <img
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt="netflix logo"
          />
        </Link>
        <nav className="header__nav"></nav>

        <Link to="/profile">
          <img
            className="header__avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="avatar"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
