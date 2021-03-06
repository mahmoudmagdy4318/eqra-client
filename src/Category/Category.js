import React from 'react';
import './styles/Category.css';
import useStyles from './styles/CategoryStyle';

// Selected Category
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
// List Category
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
// Axios
import axiosInstance from "../API/axiosInstance";
import Home from '../Layout/Home';
import Snack from '../utils/Snackbar';


const UserCategory = () => {
    const [checked, setChecked] = React.useState([]);
    const [allCategories, setAllCategories] = React.useState([]);
    const classes = useStyles();
    const [successOpen, setSuceesOpen] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");
    const handleToggle = (id, name) => () => {
        const currentIndex = checked.findIndex(x => x.id === id);
        const newChecked = [...checked];
        if (currentIndex === -1) 
            newChecked.push({id, name});
        else
            newChecked.splice(currentIndex, 1);
        setChecked(newChecked);
    };
    const getUserCategories = async() =>{
        const categories = await axiosInstance.get("api/user/genre");
        setChecked(categories);
    }
    const getAllCategories = async() =>{
        const AllCategories = await axiosInstance.get("api/genre");
        setAllCategories(AllCategories);
    }
    const saveUserCategories = async() =>{
        const genres = checked.map(elem => elem.id);
        await axiosInstance.post("api/user/genre", {genres});
        setSuceesOpen(true);
        setSuccessMsg("Congrats! Your Categories Saved Successfully You WIll Redirect to Home Now..")
        setTimeout(() => {
            window.location.href = "/";
        }, 4000)
    }
    React.useEffect(() =>{
        getUserCategories();
        getAllCategories();
    },[])
    const handleDelete = (id) => {
        const deletedIndex = checked.findIndex(x => x.id === id);
        const newChecked = [...checked];
        if(deletedIndex !== -1)
            newChecked.splice(deletedIndex, 1);
        setChecked(newChecked);
    };
    const listCategories = allCategories.map((value) => {
        const labelId = `checkbox-list-label-${value.id}`;
        return (
            <ListItem key={value.id} role={undefined} dense button onClick={handleToggle(value.id, value.name)}>
                <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={checked.findIndex(x => x.id === value.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.name} />
                    <ListItemSecondaryAction>
                </ListItemSecondaryAction>
            </ListItem>
        );
    });
    const selectedCategories = checked.map(val => {
        return(
            <li className={[classes.listItemStyle]} key={val.id}>
                <Chip
                    label={val.name}
                    clickable
                    size="medium"
                    color="primary"
                    onDelete={() => handleDelete(val.id)}
                />
            </li>
        )
    });
  return (
    <div className={classes.root}>
    <Snack
        open={successOpen}
        setOpen={setSuceesOpen}
        severity="info"
        messege={successMsg}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <h3 className={classes.headerTitle}>Hello, Please Select Your Category To Reach People Faster..</h3>
        </Grid>
        <Grid className="selectedCategories" item xs={12} sm={6}>
            <div className="innerDiv">
                <p className={classes.paragraphStyle}>Your Categories...</p>
                <ul className={classes.listCategoryStyle}>
                    {selectedCategories}
                </ul>
            </div>
        </Grid>
        <Grid  className="borderStyle" item xs={12} sm={6}>
        <p className={classes.paragraphStyle}>Click On Each Category to Add It...</p>
        <List className={classes.DropList} subheader={<li />}>
            {listCategories}
        </List>
        </Grid>
        <Grid item xs={11}>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={saveUserCategories}
                >
                Save Current Categories
            </Button>
        </Grid>
      </Grid>
    </div>
  );
}
export default Home(UserCategory);