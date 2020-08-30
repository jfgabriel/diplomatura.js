import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AddMemePage from "../pages/AddMemePage";
import MemeComsPage from "../pages/MemeComsPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [userName, setUserName] = useState("");

  const login = () => {
    setUserName("miUser@gmail.com");
    return true;
  };

  const logout = () => {
    setUserName("");
    return true;
  };

  return (
    <BrowserRouter>
      <Layout userName={userName}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/addmeme"
            component={AddMemePage}
            userName={userName}
          />
          <Route
            exact
            path="/memeComs"
            component={MemeComsPage}
            userName={userName}
          />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
