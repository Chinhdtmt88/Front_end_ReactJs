import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./pages/routes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ component: Component, path, ...rest }) => {
          return (
            <Route
              key="{component}"
              render={(props) => (
                <React.Suspense fallback={"loading"}>
                  <Component {...props} />
                </React.Suspense>
              )}
              path={path}
              {...rest}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
