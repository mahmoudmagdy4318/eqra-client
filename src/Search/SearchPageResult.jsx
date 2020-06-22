import React, { Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./style/SearchPageResultStyle";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from "@material-ui/core/Button";
import PersonIcon from '@material-ui/icons/Person';

const SearchPageResult = (props) => {
  const classes = useStyles();
  const searchResult = props.searchResult;
  return (
    <Fragment>
      {searchResult?.map((user) => {
        return (
          <Card className={classes.middleCard}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={user.full_name}
              subheader={`Joined ${user.created_at}`}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
               {user.email}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<PersonAddIcon fontSize={"small"} />}
                >
                  Follow
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<PersonIcon fontSize={"small"}  />}
                >
                  View Profile
                </Button>
              
            </CardActions>
          </Card>
        );
      })}
    </Fragment>
  );
};
export default SearchPageResult;
