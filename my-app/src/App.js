import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./pages/routes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ component: Component, path, ...rest }) => {
          return <Route component={Component} key={path} {...rest} />;
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
