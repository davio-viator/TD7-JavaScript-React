class MediaLibrary{

    constructor(db){
        this.db =db;
    }

    addMember(nom){
        let resultat;
        this.db.query("INSERT INTO adherent VALUE(' ',?)",[
            nom,
        ],function(err,result){
            err? console.log(err) : resultat = (result);
        });
        return resultat;
    }

    deleteMember(nom){
        let resultat;
        this.db.query("DELETE FROM adherent WHERE nomAdherent = ?",[
            nom,
        ],function(err,result){
            err? console.log(err) : resultat = (result);
        });
        return resultat;
    }

    addBook(nomLivre){
        let resultat;
        this.db.query("INSERT INTO livre VALUE(' ',?)",[
            nomLivre,
        ],function(err,result){
            err? console.log(err) : resultat = (result);
        });
        return resultat;
    }

    deleteBook(idLivre){
        let resultat;
        this.db.query("DELETE FROM livre WHERE idLivre = ?",[
            idLivre,
        ],function(err,result){
            err? console.log(err) : resultat = (result);
        });
        return resultat;
    }

    getBooks(){
        let resultat;
        return new Promise( ( resolve, reject ) => {
            this.db.query( "SELECT *  FROM livre", ( err, resultat ) => {
                if ( err )
                    return reject( err );
                resolve( resultat );
            } );
        } );
    }

    betBorrowedBooks(){
        let resultat;
        return new Promise( ( resolve, reject ) => {
            this.db.query( "SELECT e.idLivre, l.titreLivre FROM livre l,emprunt e WHERE e.idLivre = l.idLivre ", ( err, resultat ) => {
                if ( err )
                    return reject( err );
                resolve( resultat );
            } );
        } );
        
        
    }
}
module.exports = MediaLibrary;