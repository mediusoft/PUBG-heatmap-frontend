import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Icon,
  Typography,
  CardHeader,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  ListSubheader
} from "@material-ui/core";

export const PlayerNotFound = ({ match }) => {
  return (
    <Grid style={{ height: "calc(100vh - 64px)" }}>
      <div style={{ height: "calc(100vh - 64px)" }}>
        <Grid container justify="center" alignItems="center">
          <Grid item container justify="center" xs={11} md={6}>
            <CardHeader
              title={
                <Typography color="secondary" variant="h4">
                  {`${match.params.playerName} - ${match.params.shardId}`}
                </Typography>
              }
            />
            <Card raised>
              <CardContent>
                <List
                  subheader={
                    <ListSubheader>
                      <Typography color="error" variant="h6">
                        Player not found. Check that:
                      </Typography>
                    </ListSubheader>
                  }
                >
                  <ListItem>
                    <ListItemIcon>
                      <Icon>star</Icon>
                    </ListItemIcon>
                    <ListItemText
                      id="switch-list-label-wifi"
                      primary={
                        <strong>
                          PUBG changed shard names on 2018/11/30 - If you have this page bookmarked,
                          search again
                        </strong>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Icon>text_fields</Icon>
                    </ListItemIcon>
                    <ListItemText
                      id="switch-list-label-bluetooth"
                      primary={<strong>Capitalization matches exactly</strong>}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Icon>where_to_vote</Icon>
                    </ListItemIcon>
                    <ListItemText
                      id="switch-list-label-bluetooth"
                      primary="You selected the correct region"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Icon>schedule</Icon>
                    </ListItemIcon>
                    <ListItemText
                      id="switch-list-label-bluetooth"
                      primary="The user has played a game in the last week"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Icon>play_circle_outline</Icon>
                    </ListItemIcon>
                    <ListItemText
                      id="switch-list-label-bluetooth"
                      primary="If you’ve recently changed your name, please retry after playing a match"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};
