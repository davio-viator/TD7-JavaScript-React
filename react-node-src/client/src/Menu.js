import React, {useState,useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {PersonAdd, LibraryBooks} from '@material-ui/icons';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {Dialog,DialogContent,DialogActions,DialogTitle,Button,TextField} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    speedDial: {
      position: 'fixed',
      right:'2%',
      bottom:'5%'
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


const Menu = ({getMembers,getBooks}) => {
    const classes = useStyles();
    const [direction, setDirection] = useState('up');
    const [open, setOpen] = useState(false);
    const [bookBool, setBookBool] = useState(false);
    const [memberBool, setMemberBool] = useState(false);
    const [isEmptyMember, setMember] = useState(false);
    const [isEmptyBook, setBook] = useState(false);
    const bookRef = useRef();
    const memberRef = useRef();
    const InputProps = {
        classes: {
          root: classes.text,
        },
    };

    const bookChanged = () => {
        setBook(bookRef.current.value);
    }

    const memberChanged = () => {
        setMember(memberRef.current.value);
    }
    
    const handle = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    const book = () => {
        if (bookBool) {
            setBookBool(false);
            setBook('');
        } else {
            setBookBool(true);
        }
    }

    const member = () => {
        if (memberBool) {
            setMemberBool(false);
            setMember('');
        } else {
            setMemberBool(true);
        }
    }

    const addMember = () => {
        fetch(`/addMember?name=${memberRef.current.value}`)
            .then(res => res.json())
            .then(
            (result) => {
                getMembers()
            },
            (error) => {
            }
            )
        member();
        
    }

    const addBook = () => {
        fetch(`/addBook?name=${bookRef.current.value}`)
            .then(res => res.json())
            .then(
            (result) => {
                getBooks()
            },
            (error) => {
            }
            )
        book();
    }

    const actions = [
        { icon: <PersonAdd/>, name: 'ajouter un adhérent', function: member },
        { icon: <LibraryBooks/>, name: 'ajouter un livre', function: book},
    ];

    return (
        <div>
            <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                onClick={handle}
                open={open}
                FabProps={{style:{background:'#651C1C'}}}
                direction={direction}>
                {actions.map(action => (
                    <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={handle, action.function}
                    />
                ))}
            </SpeedDial>
            <Dialog PaperProps={{style:{background:'#212324'}}} open={bookBool} onClose={book} aria-labelledby="form-dialog-title">
                <DialogTitle className={classes.title} id="form-dialog-title">Ajouter un livre</DialogTitle>
                <DialogContent>
                <TextField
                    InputProps={InputProps} 
                    InputLabelProps={{ style: { color: '#783220'}}}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nom du livre"
                    type="text"
                    fullWidth
                    inputRef={bookRef}
                    onChange={bookChanged}
                    autoComplete="off"
                />
                </DialogContent>
                <DialogActions>
                <Button className={classes.title} onClick={book} color="primary">
                    annuler
                </Button>
                <Button className={classes.title} disabled={!isEmptyBook} onClick={addBook} color="primary">
                    ajouter
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog PaperProps={{style:{background:'#212324'}}} open={memberBool} onClose={member} aria-labelledby="form-dialog-title">
                <DialogTitle className={classes.title} id="form-dialog-title">Ajouter un adhérent</DialogTitle>
                <DialogContent>
                <TextField
                    InputProps={InputProps} 
                    InputLabelProps={{ style: { color: '#783220'}}}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="nom de l'adhérant"
                    type="text"
                    fullWidth
                    inputRef={memberRef}
                    onChange={memberChanged}
                    autoComplete="off"
                />
                </DialogContent>
                <DialogActions>
                <Button className={classes.title} onClick={member}>
                    annuler
                </Button>
                <Button className={classes.title} disabled={!isEmptyMember} onClick={addMember}>
                    ajouter
                </Button>
                </DialogActions>
            </Dialog>  
        </div>
    )
}


export default Menu;