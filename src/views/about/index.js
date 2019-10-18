import React, { useEffect, useState } from "react";
import DocumentTitle from "react-document-title";
import { Card, Grid, CardContent, Avatar, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactMarkdown from "react-markdown";
import AboutMarkdown from "./about.md";

const useStyles = makeStyles(theme => {
  return {
    root: {
      borderRadius: "0px",
      "& a": {
        color: theme.palette.secondary.main
      }
    }
  };
});

export function About() {
  const classes = useStyles();
  const [markdown, setMarkdown] = useState();

  useEffect(() => {
    fetch(AboutMarkdown)
      .then(res => res.text())
      .then(text => setMarkdown(text));
  }, []);
  return (
    <div className={classes.root}>
      <DocumentTitle title="About | pubgheatmap.net" />
      <CardContent>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} md={9}>
            <Card raised>
              <CardContent>
                <ReactMarkdown source={markdown} />
                <Grid container justify="center" alignItems="center">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://play.google.com/store/apps/details?id=com.mediusoft.jobyfy&hl=az"
                  >
                    <Avatar
                      src="https://github.com/aritraroy/social-icons/blob/master/play-store-icon.png?raw=true"
                      width="60"
                    />
                  </Link>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/O_Rzazade"
                  >
                    <Avatar
                      src="https://github.com/aritraroy/social-icons/blob/master/twitter-icon.png?raw=true"
                      width="60"
                    />
                  </Link>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/orxan-rzazade/"
                  >
                    <Avatar
                      src="https://github.com/aritraroy/social-icons/blob/master/linkedin-icon.png?raw=true"
                      width="60"
                    />
                  </Link>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/o.rzazade"
                  >
                    <Avatar
                      src="https://github.com/aritraroy/social-icons/blob/master/facebook-icon.png?raw=true"
                      width="60"
                    />
                  </Link>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/orkhan_rzazadeh/"
                  >
                    <Avatar
                      src="https://github.com/aritraroy/social-icons/blob/master/instagram-icon.png?raw=true"
                      width="60"
                    />
                  </Link>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </div>
  );
}
