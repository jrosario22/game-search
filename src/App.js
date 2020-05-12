import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Platforms from "./components/Platforms";
import Genres from "./components/Genres";
import Home from "./components/Home";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <ul className="navigation">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/genres">Genres</Link>
          </li>
          <li>
            <Link to="/platforms">Platforms</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/genres">
            <Genres />
          </Route>
          <Route path="/platforms">
            <Platforms />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
