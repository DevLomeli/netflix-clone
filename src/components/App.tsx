import "./app.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "../firebase";
import { login, logout, selectAuth } from "../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "./ScrollTop";
import Header from "./Header";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import MoviePage from "../pages/MoviePage";

function App() {
  const user: object | null = useSelector(selectAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout);
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        <ScrollToTop />
        {!user ? (
          <LoginPage />
        ) : (
          <>
            <Header />
            <Switch>
              <Route path="/moviePage/:id" component={MoviePage} />
              <Route path="/profile" exact component={ProfilePage} />
              <Route path="/" exact component={HomePage} />
            </Switch>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
