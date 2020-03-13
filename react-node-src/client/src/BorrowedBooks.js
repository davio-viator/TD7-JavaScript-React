import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Paper,Typography,Button} from "@material-ui/core";
import 'typeface-roboto';

const useStyles = makeStyles(theme => ({
    div: {
        backgroundColor: '#783220',
        height: '30rem',
        width:'20rem',
        borderRadius:'0.3rem',
        overflow:'auto',
        position:'relative',
        marginTop:'1rem',
        marginBottom:'1rem'
    },
    h1: {
        marginTop:'3%',
        textAlign:'left',
        textIndent:'1.5rem',
        fontFamily:'roboto',
        color:'white'
    },
    flex: {
        width:'100%',
        display:'flex',
        flexDirection:'column'
    },
    button: {
        width:'auto',
        borderRadius:'0.3rem',
        margin:'auto',
        marginTop:'3%',
        color:'white',
        '&:hover':{
            background:'#651C1C',
            boxShadow: 'rgba(0, 0, 0, 0.2) -2px -4px inset',
        }

    }
}));

const BorrowedBooks = ({listBorrowed}) => {
    const classes = useStyles();
    return (
        <Paper elevation={6} className={classes.div}>
            <Typography variant="h6" className={classes.h1} gutterBottom>
                Livres empruntés:
            </Typography>
            <div className={classes.flex}>
                {listBorrowed.map((element,index) => {
                    return <Button className={classes.button} key={index}>{element.name}</Button>
                })}
            </div>
        </Paper>
    )
}

export default BorrowedBooks;
