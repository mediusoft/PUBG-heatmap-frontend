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
      <List dense subheader={<ListSubheader>Settings</ListSubheader>} className={classes.root}>
        <ListItem>
          <ListItemIcon>
            <Icon>brightness_medium</Icon>
          </ListItemIcon>
          <ListItemText id="switch-list-label-heatmap" primary="Heatmap" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={event => setOption("settings.isHeatmapActive", event.target.checked)}
              checked={settings.isHeatmapActive}
              inputProps={{ "aria-labelledby": "switch-list-label-heatmap" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Icon>hourglass_full</Icon>
          </ListItemIcon>
          <ListItemText id="switch-list-label-blue-zone" primary="Blue zone" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={event => setOption("settings.isBlueZoneActive", event.target.checked)}
              checked={settings.isBlueZoneActive}
              inputProps={{ "aria-labelledby": "switch-list-label-blue-zone" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Icon>verified_user</Icon>
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="Safe zone" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={event => setOption("settings.isSafeZoneActive", event.target.checked)}
              checked={settings.isSafeZoneActive}
              inputProps={{ "aria-labelledby": "switch-list-label-bluetooth" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Icon>flash_on</Icon>
          </ListItemIcon>
          <ListItemText id="switch-list-label-red-zone" primary="Red zone" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={event => setOption("settings.isRedZoneActive", event.target.checked)}
              checked={settings.isRedZoneActive}
              inputProps={{ "aria-labelledby": "switch-list-label-red-zone" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Icon>table_chart</Icon>
          </ListItemIcon>
          <ListItemText id="switch-list-label-players" primary="Care packages" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={event => setOption("settings.isCarePackageActive", event.target.checked)}
              checked={settings.isCarePackageActive}
              inputProps={{ "aria-labelledby": "switch-list-label-players" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Icon>face</Icon>
          </ListItemIcon>
          <ListItemText id="switch-list-label-players" primary="Players" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={event => setOption("settings.isPlayersActive", event.target.checked)}
              checked={settings.isPlayersActive}
              inputProps={{ "aria-labelledby": "switch-list-label-players" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Card>
  );
};
