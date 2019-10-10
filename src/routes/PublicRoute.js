import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ component }) => {
  return <Route component={component} />;
};

export default PublicRoute;
