import React,{useState,useRef} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Paper,Typography,Button,Dialog,DialogContent,DialogActions,DialogTitle,TextField} from "@material-ui/core";
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
    },
    title: {
        color:'white'
    },
    text: {
        '&:before': {
            borderColor: '#black !important',
        },
        '&:after': {
            borderColor: '#783220 !important',
        }
    }
}));

const BooksAvailable = ({listAvailable}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState();
    const memberRef = useRef();
    const InputProps = {
        classes: {
          root: classes.text,
        },
    };

    const handle = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }

    const borrowBook = (name) => {
        setName(name);
        handle();
    }

    const borrow = () => {
        console.log(memberRef.current.value);
        handle();
    }

    return (
        <Paper elevation={6} className={classes.div}>
            <Typography variant="h6" className={classes.h1} gutterBottom>
                Livres disponibles:
            </Typography>
            <div className={classes.flex}>
                {listAvailable.map((element,index) => {
                    return <Button className={classes.button} key={index} onClick={(e =>(borrowBook(element.name)))}>{element.name}</Button>
                })}
            </div>
            <Dialog PaperProps={{style:{background:'#212324'}}} open={open} onClose={handle} aria-labelledby="form-dialog-title">
                <DialogTitle className={classes.title} id="form-dialog-title">emprunt de '{name}'</DialogTitle>
                <DialogContent>
                <TextField
                        InputProps={InputProps} 
                        InputLabelProps={{ style: { color: '#783220'}}}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="numéro de l'emprunteur"
                        type="textr"
                        fullWidth
                        inputRef={memberRef}
                    />
                </DialogContent>
                <DialogActions>
                    <Button className={classes.title} onClick={handle}>
                        fermer
                    </Button>
                    <Button className={classes.title} onClick={borrow}>
                        emprunter
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}

export default BooksAvailable;