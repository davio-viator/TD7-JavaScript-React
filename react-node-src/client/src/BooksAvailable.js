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
        color:'white',
        '&:before': {
            borderColor: '#black !important',
        },
        '&:after': {
            borderColor: '#783220 !important',
        }
    }
}));

const BooksAvailable = ({listAvailable,getBooks,getBorrowedBooks,listAdherent}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [book, setBook] = useState({name:"",id:""});
    const [borrowerExist, setBorrower] = useState(true);
    const [helper, setHelper] = useState(false);
    const memberRef = useRef();
    const InputProps = {
        classes: {
          root: classes.text,
        },
    };

    const handle = () => {
        if (open) {
            setOpen(false);
            setHelper(false);
        } else {
            setOpen(true);
        }
    }

    const borrowBook = (name,id) => {
        setBook({name:name,id:id});
        handle();
    }

    const changedInput = () => {
        let bool = true;
        listAdherent.forEach(element => {
            if (element.id === parseInt(memberRef.current.value)){
                bool = false;
            }
        });
        if (bool && memberRef.current.value != "") setHelper(true);
        else setHelper(false);
        setBorrower(bool);
    }

    const borrow = () => {
        fetch(`/borrowBook?idAdherent=${memberRef.current.value}&idLivre=${book.id}`)
            .then(res => res.json())
            .then(
            (result) => {
                getBooks();
                getBorrowedBooks();
            },
            (error) => {
            }
            )        
        handle();
    }

    return (
        <Paper elevation={6} className={classes.div}>
            <Typography variant="h6" className={classes.h1} gutterBottom>
                Livres disponibles:
            </Typography>
            <div className={classes.flex}>
                {listAvailable.map((element,index) => {
                    return <Button className={classes.button} key={index} onClick={(e =>(borrowBook(element.name,element.id)))}>{element.name}</Button>
                })}
            </div>
            <Dialog PaperProps={{style:{background:'#212324'}}} open={open} onClose={handle} aria-labelledby="form-dialog-title">
                <DialogTitle className={classes.title} id="form-dialog-title">emprunt de '{book.name}'</DialogTitle>
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
                        onChange={changedInput}
                        error={borrowerExist}
                        helperText={helper && "ça ne correspond pas à un numéro d'emprunteur"}
                        autoComplete="off"
                    />
                </DialogContent>
                <DialogActions>
                    <Button className={classes.title} onClick={handle}>
                        fermer
                    </Button>
                    <Button disabled={borrowerExist}  className={classes.title} onClick={borrow}>
                        emprunter
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}

export default BooksAvailable;
