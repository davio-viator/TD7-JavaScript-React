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


const Adherent = ({listAdherent}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [books, setBooks] = useState({name:""});
    const [name, setName] = useState();

    function showBooks (id,name) {
        fetch(`/MembersBook?id=${id}`)
            .then(res => res.json())
            .then(
            (result) => {
                setBooks(result);
                setName(name);
                handle();
            },
            (error) => {
            }
            )
    }

    const handle = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }

    return (
        <Paper elevation={6} className={classes.div}>
            <Typography variant="h6" className={classes.h1} gutterBottom>
                Adhérents:
            </Typography>
            <div className={classes.flex}>
                {listAdherent.map((element,index) => {
                    return <Button className={classes.button} key={index} onClick={(e =>(showBooks(element.id,element.name)))} >{element.id}-{element.name}</Button>
                })}
            </div>
            <Dialog PaperProps={{style:{background:'#212324'}}} open={open} onClose={handle} aria-labelledby="form-dialog-title">
            <DialogTitle className={classes.title} id="form-dialog-title">{name} à emprunter {books.length} livres</DialogTitle>
                <DialogContent>
                    {Object.keys(books).map((element,index) => {
                        return <Typography key={index} style={{color:'white'}} variant="subtitle1" gutterBottom>{books[element].titreLivre}</Typography>
                    })}
                </DialogContent>
                <DialogActions>
                <Button className={classes.title} onClick={handle}>
                    fermer
                </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}

export default Adherent;
