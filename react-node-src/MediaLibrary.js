class MediaLibrary{

    constructor(db){
        this.db =db;
    }

    addMember(nom){
        let resultat;
        // this.db.query("INSERT INTO adherent VALUE(' ',?)",[
        //     nom,
        // ],function(err,result){
        //     err? console.log(err) : resultat = (result);
        // });
        return new Promise( ( resolve, reject ) => {
            this.db.query( "INSERT INTO adherent (nomAdherent) VALUE(?)",nom, ( err, resultat ) => {
                if ( err )
                    return reject( err );
                resolve( resultat );
            } );
        } );
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
        return new Promise( ( resolve, reject ) => {
            this.db.query("INSERT INTO livre (titreLivre) VALUE(?)",nomLivre, ( err, resultat ) => {
                if ( err )
                    return reject( err );
                resolve( resultat );
            } );
        } );
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
            this.db.query( "SELECT *  FROM livre WHERE idLivre NOT IN (SELECT idLivre FROM emprunt) ", ( err, resultat ) => {
                if ( err )
                    return reject( err );
                resolve( resultat );
            } );
        } );
    }

    getBorrowedBooks(){
        let resultat;
        return new Promise( ( resolve, reject ) => {
            this.db.query( "SELECT e.idLivre, l.titreLivre FROM livre l,emprunt e WHERE e.idLivre = l.idLivre ", ( err, resultat ) => {
                if ( err )
                    return reject( err );
                resolve( resultat );
            } );
        } );
    }

    getMembers(){
        let resultat;
        return new Promise( ( resolve, reject ) => {
            this.db.query( "SELECT * FROM adherent ", ( err, resultat ) => {
                if ( err )
                    return reject( err );
                resolve( resultat );
            } );
        } );
    }

    getBorrowedBook(idLivre){
        let resultat;
        return new Promise( ( resolve, reject ) => {
            this.db.query( "SELECT nomAdherent FROM adherent WHERE idAdherent in (SELECT idAdherent FROM emprunt WHERE idLivre = ?) ",idLivre, ( err, resultat ) => {
                if ( err )
                    return reject( err );
                resolve( resultat );
            } );
        } );
    }
}
module.exports = MediaLibrary;