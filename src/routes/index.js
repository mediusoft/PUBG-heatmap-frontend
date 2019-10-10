import React, { Suspense, useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import App from "views/layout/app";
import { Spinner } from "components";
import * as Settings from "contexts/settings";
import history from "browser-history";
import { Analytics } from "lib/analytics";

const SignIn = React.lazy(() => import("views/auth").then(module => ({ default: module.SignIn })));
const SignUp = React.lazy(() => import("views/auth").then(module => ({ default: module.SignIn })));

const Routes = () => {
  const [favoritePlayers, setFavoritePlayers] = useState(
    JSON.parse(localStorage.getItem("favoritePlayersV2") || "[]")
  );

  const isFavoritePlayer = (name, shardId) => {
    return favoritePlayers.some(f => f.name === name && f.shardId === shardId);
  };
  const toggleFavoritePlayer = (name, shardId) => {
    const newFavs = favoritePlayers.some(f => f.name === name && f.shardId === shardId)
      ? favoritePlayers.filter(f => !(f.name === name && f.shardId === shardId))
      : [...favoritePlayers, { name, shardId }];

    setFavoritePlayers(newFavs);
  };

  const refreshFavoritePlayers = () => {
    const favs = JSON.parse(localStorage.getItem("favoritePlayersV2") || "[]");
    setFavoritePlayers(favs);
  };

  useEffect(() => {
    refreshFavoritePlayers();
    window.addEventListener("storage", refreshFavoritePlayers);
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritePlayersV2", JSON.stringify(favoritePlayers));
  }, [favoritePlayers]);

  return (
    <Settings.Context.Provider value={{ favoritePlayers, isFavoritePlayer, toggleFavoritePlayer }}>
      <Router history={history}>
        <Suspense fallback={<Spinner />}>
          <Route path="/" component={Analytics} />

          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/" component={App} />
          </Switch>
        </Suspense>
      </Router>
    </Settings.Context.Provider>
  );
};

export default Routes;
