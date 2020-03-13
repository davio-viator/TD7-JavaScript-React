import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Title from './Title';
import Adherent from './Adherent';
import Available from './BooksAvailable';
import Borrowed from './BorrowedBooks';

const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: '#212324',
    height: 'auto',
    minHeight:'100vh',
    width:'100%',
    position:'absolute'
  },
  flex: {
    display:'flex',
    justifyContent: 'space-around',
    width:'100%',
    flexWrap:'wrap',
    marginTop:'3%'
  }
}));

const App = () => {
  const classes = useStyles();
  const [listAdherent, setAdherent] = useState([{name:"Roger"},{name:"Jean-Pierre"},{name:"Luc"}]);
  const [listAvailable, setAvailable] = useState([{name:"moi"}]);
  const [listBorrowed, setBorrowed] = useState([{name:"toi"}]);

  return (
    <div className={classes.background}>
      <Title/>
      <div className={classes.flex}>
        <Adherent listAdherent={listAdherent}/>
        <Available listAvailable={listAvailable}/>
        <Borrowed listBorrowed={listBorrowed}/>
      </div>
    </div>
  );
}

export default App;
