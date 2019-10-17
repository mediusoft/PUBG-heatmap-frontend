import React from "react";
import { isEmpty, groupBy, map } from "lodash";
import moment from "moment";
import { ordinalSuffix } from "ordinal-js";
import { friendlyMapName } from "lib/util";
import history from "browser-history";
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
  Icon
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const MatchesList = ({ header, col, baseUrl, matches }) => {
  const useStyles = makeStyles(theme => ({
    paper: {
      marginBottom: theme.spacing(2)
    },
    padding: {
      padding: theme.spacing(col === 4 ? 2 : 1)
    },
    button: {
      margin: theme.spacing(1)
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
    <Grid raised item xs={12} md={col} lg={col}>
      <Typography align="center" variant="h5">
        {header}
      </Typography>
      {map(byDate, (ms, date) => {
        return (
          <div key={`header-${date}`} className={classes.padding}>
            <Card raised className={classes.paper}>
              <Table padding="none" size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <strong> {date}</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Map</TableCell>
                    <TableCell align="center">Place</TableCell>
                    <TableCell align="center">Kill</TableCell>
                    <TableCell align="center">Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ms.map(m => (
                    <TableRow key={m.id}>
                      <TableCell align="center">
                        {friendlyMapName(m.mapName)}
                      </TableCell>
                      <TableCell align="center">
                        <strong>{m.stats.winPlace}</strong>
                        {ordinalSuffix(m.stats.winPlace)}
                      </TableCell>
                      <TableCell align="center">
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
            </Card>
          </div>
        );
      })}
    </Grid>
  );
};

export default MatchesList;
