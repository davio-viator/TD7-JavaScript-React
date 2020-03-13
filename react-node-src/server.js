const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const app = express();
const ad = require('./Adherent.js');
const media = require('./Mediatheque.js');

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


router.get('/add',(req,res) =>{
    Adherent.addAderent(req.query.name);
    console.log(req.query.name);
    res.send('salut');
});

router.get('/remove',(req,res) =>{
    Adherent.deleteAdherent(req.query.name);
    console.log(req.query.name);
    res.send('salut');
});

router.get('/test',(req,res) =>{
    Mediatheque.getLivreEmpunte().then(function(value){
        res.send(value);
    });
});

app.use('/', router);
app.use(function(req, res, next) {
    res.status(404).send("ERROR 404 \n cette page n'éxiste pas!");
});

app.listen(8080);



