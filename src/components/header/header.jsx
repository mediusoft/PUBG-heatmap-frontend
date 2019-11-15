import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Grid,
  Tooltip,
  Link,
  IconButton,
  Hidden,
  Menu,
  MenuItem,
  ListItemText,
  Icon,
  ButtonBase,
  Badge,
  Avatar
} from "@material-ui/core";
import { Context } from "contexts/theme-context";
import { GithubIcon, AboutIcon } from "components/svg-icons";
import history from "browser-history";
import { makeStyles } from "@material-ui/core/styles";
import { GITHUB_LINK } from "config";
import logo from "assets/logo.png";

const useStyles = makeStyles({
  badge: {
    "& span": {
      right: "-12px",
      top: "3px"
    }
  },
  logo: { marginRight: "5px" }
});
export const Header = () => {
  const classes = useStyles();
  const { toggleThemeType, isDarkMode } = useContext(Context);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = () => {
    toggleThemeType();
  };
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CssBaseline />
      <AppBar>
        <Grid container>
          <Grid item xs={9}>
            <ButtonBase
              onClick={() =>
                history.push({
                  pathname: "/"
                })
              }
            >
              <Toolbar>
                <Badge color="secondary" badgeContent="β" className={classes.badge}>
                  <Avatar className={classes.logo} src={logo} />
                  <Typography variant="h5">PUBGheatmap</Typography>
                </Badge>
              </Toolbar>
            </ButtonBase>
          </Grid>
          <Grid item container justify="flex-end" alignItems="center" xs={3}>
            <Hidden smDown>
              <Grid item sm={2}>
                <Tooltip interactive title="Go to favorites page">
                  <IconButton
                    edge="start"
                    style={{ color: "#fff" }}
                    onClick={() =>
                      history.push({
                        pathname: "/favorites"
                      })
                    }
                  >
                    <Icon>star</Icon>
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item sm={2}>
                <Tooltip interactive title="Toggle light/dark theme">
                  <IconButton edge="start" onClick={handleChange} style={{ color: "#fff" }}>
                    <Icon>{isDarkMode ? "brightness_4" : "brightness_7"}</Icon>
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item sm={2}>
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
              </Grid>
              <Grid item sm={2}>
                <Tooltip interactive title="Github repository">
                  <Link target="_blank" rel="noopener noreferrer" href={GITHUB_LINK}>
                    <IconButton edge="start">
                      <GithubIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
              </Grid>
            </Hidden>

            <Hidden mdUp>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Icon>menu</Icon>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={!!anchorEl}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={event => {
                      handleClose(event);
                      history.push({
                        pathname: "/favorites"
                      });
                    }}
                  >
                    <ListItemText primary="Favorites" />
                  </MenuItem>
                  <MenuItem
                    onClick={event => {
                      handleClose(event);
                      history.push({
                        pathname: "/about"
                      });
                    }}
                  >
                    <ListItemText primary="About" />
                  </MenuItem>
                  <MenuItem
                    onClick={event => {
                      handleClose(event);
                      handleChange(event);
                    }}
                  >
                    <ListItemText primary="Toggle Theme" />
                  </MenuItem>
                  <MenuItem
                    onClick={event => {
                      handleClose(event);
                      window.location.href = GITHUB_LINK;
                    }}
                  >
                    <ListItemText primary="Github" />
                  </MenuItem>
                </Menu>
              </div>
            </Hidden>
          </Grid>
        </Grid>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
    </>
  );
};
