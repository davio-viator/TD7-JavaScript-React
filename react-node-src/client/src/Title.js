import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Typography,Paper} from "@material-ui/core";
import 'typeface-roboto';

const useStyles = makeStyles(theme => ({
    div: {
        backgroundColor: '#783220',
        height: '3.6rem',
        width:'80%',
        margin: 'auto',
        borderRadius:'1rem',
        marginTop:'2rem',
    },
    h1: {
        color: 'white',
        textAlign:'center',
        fontFamily:'roboto'
    }
  }));

const Title = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.div} elevation={10}>
            <Typography variant="h3" className={classes.h1} gutterBottom>
                Médiathèque Javascript
            </Typography>
        </Paper>
    )
}

export default Title;
