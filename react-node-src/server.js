const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const app = express();

app.set('views', './views');
app.set('view-engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.static('./public'));

const db = mysql.createConnection({
    host: "localhost",
    user: "basile",
    password: "lol",
    database: "td6"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database");
});

router.get('/', (req,res) => {
    res.send('salut');
});

app.use('/', router);
app.use(function(req, res, next) {
    res.status(404).send("ERROR 404 \n cette page n'éxiste pas!");
});

app.listen(8080);


