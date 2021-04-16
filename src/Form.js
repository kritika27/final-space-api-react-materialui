import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      marginBottom: 25,
    },
  },
}));

export default function Form({ onSearchChange }) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off" align="center">
      <TextField
        id="standard-basic"
        label="Search Characters.."
        defaultValue=""
        onChange={onSearchChange}
      />
    </form>
  );
}
