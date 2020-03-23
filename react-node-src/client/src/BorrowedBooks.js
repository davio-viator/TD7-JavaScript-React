import React,{useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Paper,Typography,Button,Dialog,DialogContent,DialogActions,DialogTitle} from "@material-ui/core";
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
    }
}));

const BorrowedBooks = ({listBorrowed,getBooks,getBorrowedBooks}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [book, setBook] = useState('');

    function showBorrower (id,name) {
        fetch(`/BorrowersBook?id=${id}`)
            .then(res => res.json())
            .then(
            (result) => {
                setName(result['0'].nomAdherent);
                handle();
            },
            (error) => {
            }
            )
        setBook({name:name,id:id});
    }

    const handle = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }

    const back = () => {
        console.log(book.name);
        console.log(book.name);
        fetch(`/returnBook?id=${book.id}&name=${book.name}`)
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
                Livres empruntés:
            </Typography>
            <div className={classes.flex}>
                {listBorrowed.map((element,index) => {
                    return <Button className={classes.button} key={index} onClick={(e =>(showBorrower(element.id,element.name)))} >{element.name}</Button>
                })}
            </div>
            <Dialog PaperProps={{style:{background:'#212324'}}} open={open} onClose={handle} aria-labelledby="form-dialog-title">
            <DialogTitle className={classes.title} id="form-dialog-title">Livre prété à {name}</DialogTitle>
                <DialogContent>
                    <Typography style={{color:'white'}} variant="subtitle1" gutterBottom>Retour de ce livre?</Typography>
                </DialogContent>
                <DialogActions>
                <Button className={classes.title} onClick={back}>
                    Ok
                </Button>
                <Button className={classes.title} onClick={handle}>
                    fermer
                </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}

export default BorrowedBooks;
