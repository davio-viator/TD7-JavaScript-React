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
            err? console.log(err) : resultat = result;
        });
        return resultat;
    }

    getBorrowedBooks(idAdherent){
        let resultat;
        return new Promise( ( resolve, reject ) => {
            this.db.query( "SELECT * FROM emprunt WHERE idAdherent = ?",idAdherent, ( err, resultat ) => {
                if ( err )
                    return reject( err );
                resolve( resultat );
            } );
        } );
    }
}

module.exports = Member;