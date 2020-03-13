const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const app = express();
const ad = require('./Members.js');
const media = require('./MediaLibrary.js');

app.set('views', './views');
app.set('view-engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.static('./public'));

const db = mysql.createConnection({
    host: "localhost",
    user: "react-node",
    password: "123456789",
    database: "td7"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database");
});

const Adherent = new ad(db);
const Mediatheque = new media(db);

router.get('/', (req,res) => {
    res.send('salut');
});

router.get('/MembersBook',(req,res) =>{
    Adherent.getBorrowedBooks(req.query.id)
    .then(function(value){
        res.send(value);
    });
});

router.get('/BorrowersBook',(req,res) =>{
    Mediatheque.getBorrowedBook(req.query.id)
    .then(function(value){
        res.send(value);
    });
});

router.get('/getMembers',(req,res) =>{
    Mediatheque.getMembers()
    .then(function(value){
        res.send(value);
    })
});

router.get('/getBooks',(req,res)=>{
    Mediatheque.getBooks()
    .then(function(value){
        res.send(value);
    })
})

router.get('/getBorrowedBooks',(req,res)=>{
    Mediatheque.getBorrowedBooks()
    .then(function(value){
        res.send(value);
    })
})

router.get('/addBook',(req,res)=>{
    console.log(req.query.name);
    Mediatheque.addBook(req.query.name);
})

router.get('/addMember',(req,res)=>{
    console.log(req.query.name);
    Mediatheque.addMember(req.query.name);
})

router.get('/borrowBook',(req,res)=>{
    console.log(req.query)
    Adherent.borrowBook(req.query.idAdherent,req.query.idLivre)
});

app.use('/', router);
app.use(function(req, res, next) {
    res.status(404).send("ERROR 404 \n cette page n'éxiste pas!");
});

app.listen(8080);



