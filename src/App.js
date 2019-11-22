import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Movie from "./components/movie";
import MovieForm from "./components/movieForm";
import NotFound from "./components/notfound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path={"/login"} component={LoginForm} />
          <Route path={"/movies/:id"} component={MovieForm} />
          <Route path={"/movies"} component={Movie} />
          <Route path={"/customers"} component={Customers} />
          <Route path={"/rentals"} component={Rentals} />
          <Route path={"/register"} component={RegisterForm} />
          <Route path={"/notfound"} component={NotFound} />
          <Redirect from="/" to="/movies" />
          <Redirect to="/notFound" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
