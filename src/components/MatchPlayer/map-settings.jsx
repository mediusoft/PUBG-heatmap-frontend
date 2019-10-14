import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  Icon,
  ListSubheader,
  ListItemIcon,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Card
} from "@material-ui/core";
import { Context } from "./Options";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export const MapSettings = () => {
  const {
    options: { settings },
    setOption
  } = useContext(Context);

  const classes = useStyles();
  const [checked, setChecked] = React.useState(["wifi"]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <Card>
      <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.root}>
        <ListItem>
          <ListItemIcon>
            <Icon>wifi</Icon>
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary="Heatmap" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={event => setOption("settings.isHeatmapActive", event.target.checked)}
              checked={settings.isHeatmapActive}
              inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Icon>bluetooth</Icon>
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="Blue zone" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={event => setOption("settings.isBlueZoneActive", event.target.checked)}
              checked={settings.isBlueZoneActive}
              inputProps={{ "aria-labelledby": "switch-list-label-bluetooth" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Icon>bluetooth</Icon>
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="Red zone" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={event => setOption("settings.isRedZoneActive", event.target.checked)}
              checked={settings.isRedZoneActive}
              inputProps={{ "aria-labelledby": "switch-list-label-bluetooth" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Icon>bluetooth</Icon>
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="Players" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={event => setOption("settings.isPlayersActive", event.target.checked)}
              checked={settings.isPlayersActive}
              inputProps={{ "aria-labelledby": "switch-list-label-bluetooth" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Card>
  );
};
