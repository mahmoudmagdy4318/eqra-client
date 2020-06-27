import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '56ch',
    maxHeight:"60ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  NotificationDropDown:{
    marginTop:'20px'
  }
}));
export default useStyles;