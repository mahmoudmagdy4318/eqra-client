import { makeStyles } from '@material-ui/core/styles';
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
      margin:"5px",
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
  },
  DropList:{
      width: '100%',
  maxWidth: 420,
  position: 'relative',
  overflow: 'auto',
  maxHeight: 420,
  }
}));
export default useStyles;