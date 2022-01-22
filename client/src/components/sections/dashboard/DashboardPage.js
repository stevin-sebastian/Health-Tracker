import React  from 'react';
import clsx from 'clsx';
import { withRouter } from "react-router";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { ListItems } from '../listitem';
import { logoutUser } from "../../../actions/authActions";
import { getFilteredUsers, getAllUsers, getUser, updateUser, deleteUser} from "../../../actions/userActions";
import { getAllBMIs, getFilteredBMIs, registerBMI, updateBMI, deleteBMI} from "../../../actions/bmiActions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
var itemList = (<ListItems />);
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Life Tracker
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    margin:'10px 0',
    flexGrow: 2,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  grid: {
    margin: 2
  },
  fixedHeight: {
    height: 240,
  },
  btnstyle: {
    margin:'8px 0',
    backgroundColor: '#666bff'}
}));

function onLogoutClick(e) {
  e.preventDefault();
  this.props.logoutUser();
}

const DashboardPage =  (props) => {

  const [value, setValue] = React.useState(0);
  const [company, setCompany] = React.useState("");
  const [project, setProject] = React.useState("");
  const [allProjects, setAllProjects] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [pList, setPList] = React.useState([]);
  const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
    });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  function onLogoutClick(e) {
    e.preventDefault();
    props.logoutUser();
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };
  console.log(props);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Grid container>
            <Grid item xs={11}>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Health Tracker
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Button color="inherit" className={classes.btnstyle} onClick={onLogoutClick}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{itemList}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Paper className={classes.paper}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-company-native-simple">Company</InputLabel>
            <Select
              native
              value={state.age}

              label="Company"
              inputProps={{
                name: 'company',
                id: 'outlined-company-native-simple',
              }}
            >{list.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
            </Select>
          </FormControl>
            <Grid container className={classes.grid}>
              <Grid item xs={5}>

              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={5}>

              </Grid>
            </Grid>

            <Grid container  className={classes.grid}>
              <Grid item xs={3}></Grid>
              <Grid item xs={6}>

              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
        </Paper>

        <Paper className={classes.paper}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-project-native-simple">Project</InputLabel>
            <Select
              native
              value={state.age}

              label="Project"
              inputProps={{
                name: 'project',
                id: 'outlined-project-native-simple',
              }}
            >{pList.map(item =><option key={item.key} value={item.item}>{item.item}</option>)}
            </Select>
          </FormControl>
            <Grid container className={classes.grid}>
              <Grid item xs={5}>

              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={5}>

              </Grid>
            </Grid>
            <Grid container className={classes.grid}>
              <Grid item xs={5}>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={5}>
              </Grid>
            </Grid>
        </Paper>



          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>

      </main>
    </div>
  );
}

DashboardPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getFilteredUsers, logoutUser, getUser, getAllUsers, updateUser, deleteUser,
     getAllBMIs, getFilteredBMIs, updateBMI, deleteBMI, registerBMI}
)(withRouter(DashboardPage));
