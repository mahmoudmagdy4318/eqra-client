import React from "react";
import { UserContext } from "../context/userContext";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Popover from "@material-ui/core/Popover";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MessageIcon from "@material-ui/icons/Message";
import PersonIcon from "@material-ui/icons/Person";
// Component
import Search from '../Search/SearchBar';
import FollowNotification from "../Notifications/FollowNotification";

const EventNavBar = (props) => {
  const {
    data: { user: currentUser },
  } = React.useContext(UserContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  // Right Drop Downmenu Functionality
  const handleClick = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl2(null);
  };
  const open = Boolean(anchorEl2);
  const id = open ? "simple-popover" : undefined;
  // ========== End Right DropDown Menu ============
  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" >
        <Toolbar>
          {/* Right Dropdown Menu Button & Menu*/}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl2}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuList>
              <Link to="/" className="disable-link ">
                <MenuItem>
                  <ListItemIcon>
                    <HomeIcon fontSize="medium" color={"primary"} />
                  </ListItemIcon>
                  <Typography variant="inherit">Home </Typography>
                </MenuItem>
              </Link>
              <Link className="disable-link " to={`/profile/${localStorage.getItem('role')}/${currentUser.id}`}>
                <MenuItem>
                  <ListItemIcon>
                    <PersonIcon fontSize="medium" color={"primary"} />
                  </ListItemIcon>
                  <Typography variant="inherit"> Profile</Typography>
                </MenuItem>
              </Link>
              <MenuItem>
                <ListItemIcon>
                  <NotificationsIcon fontSize="medium" color={"primary"} />
                </ListItemIcon>
                <Typography variant="inherit">Notifications</Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <MessageIcon fontSize="medium" color={"primary"} />
                </ListItemIcon>
                <Typography variant="inherit">Messages</Typography>
              </MenuItem>
              <Link to="/logout" className="disable-link">
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <ExitToAppIcon fontSize="medium" color={"primary"}/>
                  </ListItemIcon>
                  <Typography>Logout</Typography>
                </MenuItem>
              </Link>
            </MenuList>
          </Popover>
          <Typography className={classes.title} variant="h6" noWrap>
            Eqraa Online
          </Typography>
          {/* Search Bar */}
          <Search />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {currentUser.role === "writer" ? (
              <Button
                href="/newEvent"
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<EventNoteIcon />}
              >
                Create Event
              </Button>
            ) : (
                ""
              )}

            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            {/* Follow Component */}
            <FollowNotification/>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}

    </div>
  );
};
export default EventNavBar;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  typography: {
    padding: theme.spacing(2),
  },
}));
