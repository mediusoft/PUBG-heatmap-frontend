import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, Tooltip, Link, IconButton, Icon, ButtonBase } from "@material-ui/core";
import { Context } from "contexts/theme-context";
import { LightIcon, GithubIcon, AboutIcon } from "components/svg-icons";
import history from "browser-history";
import { GITHUB_LINK } from "config";

export const Header = () => {
  const { toggleThemeType, isDarkMode } = useContext(Context);
  const handleChange = () => {
    toggleThemeType();
  };

  return (
    <>
      <CssBaseline />
      <AppBar>
        <Grid container>
          <Grid item xs={10}>
            <ButtonBase
              onClick={() =>
                history.push({
                  pathname: "/"
                })
              }
            >
              <Toolbar>
                <Typography variant="h5">Pubgheatmap.net</Typography>
              </Toolbar>
            </ButtonBase>
          </Grid>
          <Grid item container spacing={2} justify="space-around" alignItems="center" xs={2}>
            <Tooltip interactive title="Go to favorites page">
              <IconButton
                style={{ color: "#fff" }}
                edge="start"
                onClick={() =>
                  history.push({
                    pathname: "/favorites"
                  })
                }
              >
                <Icon color="">star</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip interactive title="Toggle light/dark theme">
              <IconButton onClick={handleChange}>
                <LightIcon isDarkMode={isDarkMode} />
              </IconButton>
            </Tooltip>
            <Tooltip interactive title="Go to about page">
              <IconButton
                edge="start"
                onClick={() =>
                  history.push({
                    pathname: "/about"
                  })
                }
              >
                <AboutIcon />
              </IconButton>
            </Tooltip>
            <Tooltip interactive title="Github repository">
              <Link target="_blank" rel="noopener noreferrer" href={GITHUB_LINK}>
                <IconButton edge="start">
                  <GithubIcon />
                </IconButton>
              </Link>
            </Tooltip>
          </Grid>
        </Grid>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
    </>
  );
};
