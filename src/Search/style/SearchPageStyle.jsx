import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      flex: 1,
      justifyContent: "center",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "45ch",
    },
    marginBtn: {
      marginTop: "21px",
    },
    middleItems: {
      marginTop: "20px",
      marginBottom:"30px",
    },
    alertMargin:{
      marginTop:"20px"
    }
  }));

export default useStyles;