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
import AddIcon from '@material-ui/icons/Add';
import { ListItems } from '../listitem';
import { logoutUser } from "../../../actions/authActions";
import { getFilteredUsers, updateUser} from "../../../actions/userActions";
import { getAllBMIs, getFilteredBMIs, registerBMI, updateBMI, deleteBMI} from "../../../actions/bmiActions";
import BMI_spline from "./BMI_spline"
import Weight_spline from "./Weight_spline"
import Popup from "../../elements/Popup"
import RegisterForm from "./registerForm"


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

function getBMI (props) {
    return props.getAllBMIs({email:props.auth.user.email, auth:props.auth.isAuthenticed}, props.history)
}

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
  divider: {
    background: "#ffffff"
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
  title2: {
    margin:'15px 10px 10px 15px',
    flexGrow: 2,
    color: "#ffffff"
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
    backgroundColor: '#666bff'},
  btnstyle1: {
    margin:'8px 0',
    backgroundColor: '#ffffff'}
}));

function onLogoutClick(e) {
  e.preventDefault();
  this.props.logoutUser();
}

const BMIPage =  (props) => {


  const [value, setValue] = React.useState(0);
  const [openRegPopup, setOpenRegPopup] = React.useState(false);
  const [weightStatus, setWeightStatus] = React.useState();
  const [bmiStatus, setBMIStatus] = React.useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(async () => {
    const d = await getBMI(props);
    setWeightStatus(d.data[d.data.length-1].weight);
    setBMIStatus(d.data[d.data.length-1].bmi);
  },[]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const addNewRecord = (data, resetForm) => {

    var newBmi = (data.weight/(props.auth.user.height*props.auth.user.height)).toFixed(2);
    newBmi = parseFloat(newBmi);
    const input = {
      params: {
        email: props.auth.user.email,
        auth: props.auth.isAuthenticated
      },
      body: data
    };
    const input2 = {
      params: {
        email: props.auth.user.email,
        auth: props.auth.isAuthenticated,
        userID: props.auth.user.id
      },
      body: {
        currentBMI: newBmi,
        currentWeight: data.weight
      }
    };
    console.log(input);
    props.registerBMI(input, props.history);
    props.updateUser(input2, props.history);
    setWeightStatus(data.weight);
    setBMIStatus(newBmi);

    resetForm();
    setOpenRegPopup(false);
  }

  const openInRegPopup = item => {

      setOpenRegPopup(true);
  }

  function onLogoutClick(e) {
    e.preventDefault();
    props.logoutUser();
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };
  var xs = 2;
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
          <Paper style={{ margin: "0px 0px 16px 0px", backgroundColor: "#003580"}} >
            <Grid container>
              <Grid item xs={2} container justifyContent="center">
                <Typography component="h1" variant="h5"  noWrap className={classes.title2}>
                  TODAY:
                </Typography>
                <Divider orientation="vertical" flexItem className={classes.divider} />
              </Grid>
              <Grid item xs={3} container justifyContent="center">
                <Typography component="h1" variant="h6"  noWrap className={classes.title2}>
                  Weight: {weightStatus} kg
                </Typography>
                <Divider orientation="vertical" flexItem className={classes.divider}/>
              </Grid>
              <Grid item xs={3} container justifyContent="center">
                <Typography component="h1" variant="h6"  noWrap className={classes.title2}>
                  Height: {props.auth.user.height} m
                </Typography>
                <Divider orientation="vertical" flexItem className={classes.divider} />
              </Grid>
              <Grid item xs={3} container justifyContent="center">
                <Typography component="h1" variant="h6"  noWrap className={classes.title2}>
                  BMI: {bmiStatus}
                </Typography>
                <Divider orientation="vertical" flexItem className={classes.divider} />
              </Grid>

              <Grid item xs={1} container justifyContent="center">
                <IconButton color="inherit" className={classes.btnstyle1} onClick={openInRegPopup}>
                  <AddIcon/>
                </IconButton>
              </Grid>
            </Grid>
          </Paper>

          <BMI_spline {...props} bmiStatus={bmiStatus}/>
          <Weight_spline {...props} weightStatus={weightStatus} />

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
        <Popup
          title="Add new Measurement"
          openPopup={openRegPopup}
          setOpenPopup={setOpenRegPopup}
        >
          <RegisterForm {...props} addNewRecord={addNewRecord}/>
        </Popup>
      </main>
    </div>
  );
}

BMIPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getFilteredUsers, updateUser, logoutUser, getAllBMIs, getFilteredBMIs, updateBMI, deleteBMI, registerBMI}
)(withRouter(BMIPage));
