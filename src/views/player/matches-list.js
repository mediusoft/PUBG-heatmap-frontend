import React from "react";
import { isEmpty, groupBy, map } from "lodash";
import moment from "moment";
import { ordinalSuffix } from "ordinal-js";
import { friendlyMapName } from "lib/util";
import history from "browser-history";
import withWidth from "@material-ui/core/withWidth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Card,
  Grid,
  Button,
  Icon,
  ExpansionPanelDetails,
  ExpansionPanel,
  ExpansionPanelSummary
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const collapsedSizes = ["xs", "sm"];

const MatchesList = ({ header, col, baseUrl, matches, width }) => {
  const useStyles = makeStyles(theme => ({
    paper: {
      marginBottom: theme.spacing(2)
    },
    padding: {
      padding: theme.spacing(col === 4 ? 2 : 1)
    },
    detail: {
      display: "flex",
      justifyContent: "center",
      padding: "5px"
    },
    button: {
      margin: theme.spacing(1, 0)
    },
    link: {
      textDecoration: "none"
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  if (isEmpty(matches)) {
    return <p>No matches found</p>;
  }

  const byDate = groupBy(matches, m => moment(m.playedAt).format("MMM Do"));

  return (
    <Grid raised item container justify="center" xs={12} md={col} lg={col}>
      <Grid item xs={12} md={11}>
        <Card raised className={classes.paper}>
          <ExpansionPanel defaultExpanded={!collapsedSizes.includes(width)}>
            <ExpansionPanelSummary
              expandIcon={<Icon>expand_more</Icon>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography align="center">{header}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.detail}>
              <Grid container spacing={2} item xs={12} direction="column">
                {map(byDate, (ms, date) => {
                  return (
                    <Grid key={`header-${date}`} item>
                      <Table padding="none" size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell colSpan={5} align="center">
                              <strong> {date}</strong>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">Map</TableCell>
                            <TableCell align="left">Place</TableCell>
                            <TableCell align="left">Kill</TableCell>
                            <TableCell align="right">Time</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {ms.map(m => (
                            <TableRow key={m.id}>
                              <TableCell align="left">{friendlyMapName(m.mapName)}</TableCell>
                              <TableCell align="left">
                                <strong>{m.stats.winPlace}</strong>
                                {ordinalSuffix(m.stats.winPlace)}
                              </TableCell>
                              <TableCell align="left">
                                <strong>{m.stats.kills}</strong>
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  onClick={() => history.push(`${baseUrl}/${m.id}`)}
                                  size="small"
                                  variant="contained"
                                  color="secondary"
                                  className={classes.button}
                                >
                                  {moment(m.playedAt).format("H:mm")}
                                  <Icon fontSize="small" className={classes.rightIcon}>
                                    double_arrow
                                  </Icon>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Grid>
                  );
                })}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Card>
      </Grid>
    </Grid>
  );
};

export default withWidth()(MatchesList);
