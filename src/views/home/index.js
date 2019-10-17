import React, { useState, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import headerImg from "assets/pubg_erangel.png";
import { SHARDS } from "config";
import history from "browser-history";
import {
  Card,
  CardContent,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Grid,
  Icon,
  Button,
  Typography,
  ButtonBase,
  Link
} from "@material-ui/core";
import { Spinner } from "components";
import { useStyles } from "./home.style";

export function Home() {
  const classes = useStyles();

  const GET_SAMPLE_MATCH = gql`
    query($shardId: String!) {
      sampleMatch(shardId: $shardId) {
        id
        playerName
        shardId
      }
    }
  `;

  const [labelWidth, setLabelWidth] = useState(0);
  const [shardId, setShardId] = useState(
    localStorage.getItem("shardIdV2") || SHARDS[0]
  );
  const [searchText, setSearchText] = useState("");

  const inputRef = useCallback(node => {
    if (node !== null) {
      node.focus();
    }
  }, []);
  const labelRef = useCallback(node => {
    if (node !== null) {
      setLabelWidth(node.offsetWidth);
    }
  }, []);

  const handleShardsChange = event => {
    const { value } = event.target;
    setShardId(value);
    localStorage.setItem("shardIdV2", value);
  };

  const handleInputChange = e => {
    setSearchText(e.target.value);
  };

  const search = e => {
    if (e) e.preventDefault();
    if (searchText && shardId) {
      history.push(`/${searchText}/${shardId}`);
    }
  };

  const { loading, error, data } = useQuery(GET_SAMPLE_MATCH, {
    variables: {
      shardId: localStorage.getItem("shardIdV2") || SHARDS[0]
    }
  });
  if (loading) return <Spinner />;
  const sm = data ? data.sampleMatch : {};
  return (
    <div className={classes.root}>
      <Grid className={classes.padding} item container justify="center" alignItems="center">
        <Grid container item xs={11} md={5} justify="center">
          <Card className={classes.content}>
            <CardContent>
              <Grid container spacing={3} direction="column">
                <Grid item>
                  <form onSubmit={search}>
                    <Grid container item  spacing={2} justify="space-between"  >
                      <Grid item xs={12} md={3}>
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <InputLabel
                            ref={labelRef}
                            htmlFor="outlined-select-simple"
                          >
                            Shards
                          </InputLabel>
                          <Select
                            value={shardId}
                            onChange={handleShardsChange}
                            labelWidth={labelWidth}
                            inputProps={{
                              name: "shardId",
                              id: "outlined-select-simple"
                            }}
                          >
                            {SHARDS.map(item => (
                              <MenuItem key={item} value={item}>
                                {item.toUpperCase()}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <TextField
                            inputRef={inputRef}
                            autoFocus
                            onChange={handleInputChange}
                            required
                            value={searchText}
                            id="playerName"
                            label="Player name"
                            variant="outlined"
                            className={classes.textField}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            size="large"
                            className={classes.button}
                            endIcon={<Icon>search</Icon>}
                          >
                            Search
                          </Button>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>

                <Grid item container justify="center" alignItems="center">
                  <Link
                    className={!!error && classes.disabled}
                    href={sm ? `/${sm.playerName}/${sm.shardId}/${sm.id}` : ""}
                  >
                    <Grid item container justify="center">
                    <ButtonBase
                      focusRipple
                      className={classes.image}
                      focusVisibleClassName={classes.focusVisible}
                    >
                      <span
                        className={classes.imageSrc}
                        style={{
                          backgroundImage: `url(${headerImg})`
                        }}
                      />
                      <span className={classes.imageBackdrop} />
                      <span className={classes.imageButton}>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          className={classes.imageTitle}
                        >
                          Click to watch a random match
                          <span className={classes.imageMarked} />
                        </Typography>
                      </span>
                    </ButtonBase>
                    </Grid>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
