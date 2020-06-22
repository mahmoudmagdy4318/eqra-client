import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "80%",
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

export default useStyles;