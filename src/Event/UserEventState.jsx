import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import DoneIcon from '@material-ui/icons/Done';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axiosInstance from '../API/axiosInstance';
const UserEventState = (props) => {
    const currentUser = props.user;
    const eventId = props.eventId;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [currentEventState, setCurrentEventState] = React.useState({state: "going"});
    const getUserState = async () => {
        const userState = await axiosInstance.get(`api/event/${eventId}/participantStatus`);
        setCurrentEventState({state: userState.state});
    }
    React.useEffect(() =>{
        getUserState();
    }, []);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      console.log(event.currentTarget)
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const changeCurrentEventState = async (state) =>{
        setCurrentEventState({state});
        const res = await axiosInstance.post(`api/event/${eventId}/participantStatus`, {state: state});
        console.log(res)
    }
    return(
        <div>
          <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        size={"medium"}
        startIcon={currentEventState.state === 'pending'? <HourglassEmptyIcon/>: 
        currentEventState.state === 'interested'? <StarIcon />: <DoneIcon /> }
      >
        {currentEventState.state}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem  selected={currentEventState.state === "pending"} onClick={()=> changeCurrentEventState("pending")}>
          <ListItemIcon>
                    <HourglassEmptyIcon/>
          </ListItemIcon>
          <ListItemText primary="Pending"/>
        </StyledMenuItem>
        <StyledMenuItem selected={currentEventState.state === "interested"} onClick={()=> changeCurrentEventState("interested")}>
          <ListItemIcon>
                    <StarIcon/>
          </ListItemIcon>
          <ListItemText primary="Interested" />
        </StyledMenuItem>
        <StyledMenuItem selected={currentEventState.state === "going"} onClick={()=> changeCurrentEventState("going")}>
          <ListItemIcon>
            <DoneIcon />
          </ListItemIcon>
          <ListItemText primary="Going"/>
        </StyledMenuItem>
      </StyledMenu>
      <Button
        variant="contained"
        color="primary"
        size={"medium"}
        startIcon={<PersonAddIcon/>}
      >
        Invite
      </Button>
          </div>
    )
}

export default UserEventState;

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);