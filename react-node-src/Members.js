class Member{

    constructor(db){
        this.db =db;
    }

    borrowBook(idAdherent,idLivre){
        let resultat;
        // this.db.query(`INSERT INTO emprunt VALUE(?,?)`,[
        //     idAdherent,
        //     idLivre,
        // ],function(err,result){
        //     err? console.log(err) : resultat = result;
        // });
        return new Promise( ( resolve, reject ) => {
            this.db.query(`INSERT INTO emprunt VALUE(?,?)`,[idAdherent,idLivre], ( err, resultat ) => {
                if ( err )
                    return reject( err );
                resolve( resultat );
            } );
        } );
    }

    getBorrowedBooks(idAdherent){
        let resultat;
        return new Promise( ( resolve, reject ) => {
            this.db.query( "SELECT titreLivre FROM livre l WHERE l.idLivre in (SELECT e.idLivre FROM emprunt e WHERE e.idAdherent = ?) ",idAdherent, ( err, resultat ) => {
                if ( err )
                    return reject( err );
                resolve( resultat );
            } );
        } );
    }

    returnBook(idLivre){
        let resultat;
        return new Promise( ( resolve, reject ) => {
            this.db.query(`DELETE FROM emprunt WHERE idLivre=?`,idLivre, ( err, resultat ) => {
                if ( err )
                    return reject( err );
                resolve( resultat );
            } );
        } );
    }
}

module.exports = Member;