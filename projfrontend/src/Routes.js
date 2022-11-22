import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";

export default function Routes() {
  return (
    <BrowserRouter>
      <switch>
        <Route path="/" exact component={Home} />
      </switch>
    </BrowserRouter>
  );
}
