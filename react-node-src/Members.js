class Member{

    constructor(db){
        this.db =db;
    }

    borrowBook(idAdherent,idLivre){
        let resultat;
        this.db.query(`INSERT INTO emprunt VALUE(?,?)`,[
            idAdherent,
            idLivre,
        ],function(err,result){
            err? console.log(err) : resutat = result;
        });
        return resultat;
    }

    getBorrowedBooks(idAdherent){
        let resultat;
        this.db.query("SELECT * FROM emprunt WHERE idAdherent = ?",[
            idAdherent
        ],function(err,result){
            err? console.log(err) : resutat = result;
        });
        return resultat;
    }
}

module.exports = Member;