import React from "react";
import moment from "moment";
import { ordinalSuffix } from "ordinal-js";
import {
  List,
  Typography,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Icon
} from "@material-ui/core";

class MatchInfo extends React.PureComponent {
  render() {
    const { match, marks } = this.props;

    const playedAt = moment(match.playedAt).format("MMM Do h:mm a");
    const { stats } = match.players.find(p => p.name === marks.focusedPlayer());

    return (
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Icon>local_airport</Icon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="h6">{playedAt}</Typography>}
            secondary={
              <Typography variant="inherit">
                <strong>{stats.winPlace}</strong>
                {ordinalSuffix(stats.winPlace)} place,&nbsp;
                <strong>{stats.kills}</strong> kills
              </Typography>
            }
          />
        </ListItem>
      </List>
    );
  }
}

export default MatchInfo;
