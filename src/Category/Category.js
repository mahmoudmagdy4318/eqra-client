import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Category.css';
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
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        textAlign:"center",
        justifyContent: 'center',
        flexWrap: "wrap",
        '& > *': {
        margin: theme.spacing(0.5),
        },
    },
    headerTitle:{
        margin:"10px",
        marginTop:"60px",
        marginBottom:"20px",
        
    },
    paragraphStyle:{
        fontSize:"22px",
        marginTop:"20px"
    },
    listCategoryStyle:{
        listStyle:"none",
        marginTop:"20px",
        width:"100%"
    },
    listItemStyle:{
        marginTop:"15px",
        width:"70%",
        marginLeft:"90px"
    }
}));
const UserCategory = () => {
    const [checked, setChecked] = React.useState([]);
    const [category, setCategory] = React.useState([]);
    const classes = useStyles();
    const handleToggle = (value, name) => () => {
        const currentIndex = checked.findIndex(x => x.value === value);
        const newChecked = [...checked];
        if (currentIndex === -1) 
            newChecked.push({value, name});
        else
            newChecked.splice(currentIndex, 1);
        setChecked(newChecked);
    };
    const getCategories = async() =>{
        try{
            const categories = await axiosInstance.get("http://localhost:8000/api/user/genre", {
                headers:{
                "Accept": "application/json",
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGNmZGYwODdlMTkxYWY4ZDZhOWYwMDNjMDEyZWZiZWU1YzJhNjRmY2Q1MzJiOGNjN2E3YjQyZmE5Y2M2OGY1OGRjZWMyOTE0NDhjNDJkYTkiLCJpYXQiOjE1OTE0ODY1OTMsIm5iZiI6MTU5MTQ4NjU5MywiZXhwIjoxNjIzMDIyNTg5LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.qX2zIaVYsuB9HSjvWcQjVG1sYurUbwTzvgecjdFO1d2HZs2DpB-qLb5B-oxeHbfUkpnKI3SR9zc_zzIlMv7koKQGx4jqPhYq8BgsWT77VSZFqdfD0BMcb3PCwSU6lctok4SuIU818La0b8axtalDSy5zUk_qyFtLfR-adcABxNejXMpHGq0ncEWuooXY9rmVXMhUFSpoEd8oSgZu_uf6gKiHDCAw16shAvQkMW-KZJzA44ArMKGXHiBrKgZ72b2vpUdZPsq69WuVUe2c9bFMYqbPHzQI9fhmGfl_BXZeVULK_S-A2XfqrIVn4V68rw1QxDjFE6JtGnh36h6-Ai3iuS-D7AMkJfEtilGC07AbCuVg0OKF8Iih0-dZGwlZJkrXg3tqBVkvpj0cHJOB8DQn9SoC3y-NMF1kDzTefzWNRGfiDAOAj1LgdHDGmAO2tpH9UoVW6wWxFi8NNOvxjphk6ROpsPtrxL0b0jC-UECvgwDwpYzCZHkWSdQtuGpmqUnEdUbxDoAxyfBuo6A8SEOjQsVgzZQ5VA04BIm-g6i403aq0MgsD2wWaD2Jp56HRCdCHfJMXmTOvxLVbwvEI2UjAWzAPIfQqGrCR1fzUJBnqIlrLFGPw156pOWx1Qj8jSdm57X2SQBdF6N1uasd_co37FttdPovDtZN0BqiECT-wWo"
            }});
            setCategory(categories.data);
        }catch(err){
            console.log(err)
        }
    }
    React.useEffect(() =>{
        getCategories();
    },[])
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };
    const listCategories = category.map((value) => {
        const labelId = `checkbox-list-label-${value.value}`;
        return (
            <ListItem key={value.id} role={undefined} dense button onClick={handleToggle(value.id, value.name)}>
                <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={checked.findIndex(x => x.value === value.id) !== -1}
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
            <li className={[classes.listItemStyle]} key={val.value}>
                <Chip
                    label={val.name}
                    clickable
                    size="medium"
                    color="primary"
                    onDelete={handleDelete}
                />
            </li>
        )
    });
  return (
    <div className={classes.root}>
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
        <Grid  className="borderStyle" item xs={12} sm={4}>
        <p className={classes.paragraphStyle}>Click On Each Category to Add It...</p>
        <List>
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
                >
                Save Current Categories
            </Button>
        </Grid>
      </Grid>
    </div>
  );
}
export default UserCategory;

