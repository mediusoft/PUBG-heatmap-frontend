import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthorizedRoute = ({
  component,
  isLoggedIn = true,
  forcePasswordChange = false,
  ...rest
}) => {
  const { location } = rest;
  if (location.pathname === "/signin") {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <Redirect
        push
        to={{
          pathname: "/signin",
          state: { from: location, redirected: true }
        }}
      />
    );
  }

  if (forcePasswordChange) {
    return (
      <Redirect
        push
        to={{
          pathname: "/changepassword",
          state: { from: location }
        }}
      />
    );
  }

  return <Route component={component} {...rest} />;
};

export default AuthorizedRoute;
