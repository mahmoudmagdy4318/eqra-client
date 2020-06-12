import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import InputAdornment from '@material-ui/core/InputAdornment';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DescriptionIcon from '@material-ui/icons/Description';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    marginTop: 20,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid xs={6}>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Add New Event Now
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Event Name"
                  fullWidth variant="outlined"
                  autoComplete="given-name"
                  InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <EventNoteIcon />
                        </InputAdornment>
                    ),
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required variant="outlined"
                  id="description"
                  name="description"
                  label="Event Description"
                  fullWidth
                  autoComplete="family-name"
                  InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <DescriptionIcon />
                        </InputAdornment>
                    ),
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required variant="outlined"
                  id="location"
                  name="location"
                  label="Event Location"
                  fullWidth
                  autoComplete="shipping address-line1"
                  InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <LocationOnIcon />
                        </InputAdornment>
                    ),
                    }}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                fullWidth variant="outlined"
                    id="start_date"
                    name="start_date"
                    label="Start Date"
                    type="datetime-local"
                    defaultValue="2020-05-24T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                fullWidth variant="outlined"
                    id="end_date"
                    name="end_date"
                    label="End Date"
                    type="datetime-local"
                    defaultValue="2021-05-24T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
              </Grid>
              <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth size={"large"}>
        Start Event
      </Button>
              </Grid>
            </Grid>
          </React.Fragment>
        </Grid>
      </Grid>
    </div>
  );
}
