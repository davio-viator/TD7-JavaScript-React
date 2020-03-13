import React, {useState,useEffect} from 'react';
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
  const [listAdherent, setAdherent] = useState([{name:"Roger",id:"7"},{name:"Jean-Pierre",id:""},{name:"Luc",id:""}]);
  const [listAvailable, setAvailable] = useState([{name:"moi"}]);
  const [listBorrowed, setBorrowed] = useState([{name:"toi"}]);

  let members = [] ;
  let books = [];
  let borrowed = []
  
  function getMembers () {
    fetch(`/getMembers`)
        .then(res => res.json())
        .then(
        (result) => {
            for(let i=0;i<Object.keys(result).length;i++){
              members.push({id:result[i].idAdherent,name:result[i].nomAdherent})
            }
            setAdherent(members)
        },
        (error) => {
        }
        )
  }

  function getBooks () {
    fetch(`/getBooks`)
        .then(res => res.json())
        .then(
        (result) => {
            for(let i=0;i<Object.keys(result).length;i++){
              books.push({id:result[i].idLivre,name:result[i].titreLivre})
            }
            setAvailable(books)
        },
        (error) => {
        }
        )
  }

  function getBorrowedBooks(){
    fetch(`/getBorrowedBooks`)
        .then(res => res.json())
        .then(
        (result) => {
            for(let i=0;i<Object.keys(result).length;i++){
              borrowed.push({id:result[i].idLivre,name:result[i].titreLivre})
            }
            setBorrowed(borrowed)
        },
        (error) => {
        }
        )
  }
  useEffect(() => {
    getMembers();
    getBooks();
    getBorrowedBooks();
  }, []);
 

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
