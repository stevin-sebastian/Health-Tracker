import React from 'react';
import {Link} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const ListItems = () => {
  const classes = useStyles();

  return (
  <div>
    <ListItem button component={Link} to="/BMI">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="BMI Tracker" />
    </ListItem>

  </div>
)};
// <ListItem button component={Link} to="/dashboard">
//   <ListItemIcon>
//     <DashboardIcon />
//   </ListItemIcon>
//   <ListItemText primary="Dashboard" />
// </ListItem>
// <ListItem button component={Link} to="/diet">
//   <ListItemIcon>
//     <AssignmentIcon />
//   </ListItemIcon>
//   <ListItemText primary="Diet Plan" />
// </ListItem>
// <ListItem button component={Link} to="/user">
//   <ListItemIcon>
//     <AccountCircleIcon />
//   </ListItemIcon>
//   <ListItemText primary="Account" />
// </ListItem>
