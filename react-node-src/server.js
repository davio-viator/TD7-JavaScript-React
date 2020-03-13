const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const app = express();
const ad = require('./Aderant.js');

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

router.get('/', (req,res) => {
    let a = new ad(25);
    res.send(a);
});

app.use('/', router);
app.use(function(req, res, next) {
    res.status(404).send("ERROR 404 \n cette page n'éxiste pas!");
});

app.listen(8080);



