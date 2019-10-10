import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";

const HomePage = lazy(() => import("views").then(module => ({ default: module.Home })));
const AboutPage = lazy(() => import("views").then(module => ({ default: module.About })));
const FavoritesPage = lazy(() => import("views").then(module => ({ default: module.Favorites })));
const PlayerPage = lazy(() => import("views").then(module => ({ default: module.Player })));
const MatchPage = lazy(() => import("views").then(module => ({ default: module.Match })));

export default () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/favorites" component={FavoritesPage} />
    <Route exact path="/about" component={AboutPage} />
    <Route exact path="/:playerName/:shardId" component={PlayerPage} />
    <Route path="/:playerName/:shardId/:matchId" component={MatchPage} />
  </Switch>
);
