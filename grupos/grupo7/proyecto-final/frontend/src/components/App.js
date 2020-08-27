import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AddMeme from "../components/AddMeme";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/addmeme">
            <AddMeme
              categorias={[
                { id: 1, nombre: "humor" },
                { id: 2, nombre: "politica" },
              ]}
            />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
