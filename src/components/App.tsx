import "./app.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header";

import HomePage from "../pages/HomePage";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
