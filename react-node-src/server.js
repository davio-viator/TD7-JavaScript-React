const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const app = express();
const ad = require('./Members.js');
const media = require('./MediaLibrary.js');

app.use(express.static(path.join(__dirname, 'build')));

const db = mysql.createConnection({
    host: "mysql-td7basiledavio.alwaysdata.net",
    user: "202035",
    password: "basiledavio123",
    database: "td7basiledavio_td7"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database");
});

const Adherent = new ad(db);
const Mediatheque = new media(db);


router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
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
    Mediatheque.addBook(req.query.name)
    .then(function(value){
        res.send(value);
    });
})

router.get('/addMember',(req,res)=>{
    Mediatheque.addMember(req.query.name)
    .then(function(value){
        res.send(value);
    });
    
})

router.get('/borrowBook',(req,res)=>{
    Adherent.borrowBook(req.query.idAdherent,req.query.idLivre)
    .then(function(value){
        res.send(value);
    });
});

router.get('/returnBook',(req,res)=>{
    Adherent.returnBook(req.query.id)
    .then(function(value){
        res.send(value);
    });
});

app.use('/', router);
app.use(function(req, res, next) {
    res.status(404).send("ERROR 404 \n cette page n'éxiste pas!");
});

app.listen(8100, '0.0.0.0');



