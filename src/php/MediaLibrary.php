<?php


require_once('./Model.php');
class MediaLibrary{

    
    public static function addMember($nom){
        $sql = 'INSERT INTO adherent (nomAdherent) VALUE(:nom)';
        $value = array(
            "nom" => $nom
        );
        $prepared_request = Model::$pdo->prepare($sql);
        $prepared_request->execute($value);
    }

    public static function addBook($nomLivre){
        $sql = 'INSERT INTO livre (titreLivre) VALUE(:nom)';
        $value = array(
            "nom" => $nomLivre
        );
        $prepared_request = Model::$pdo->prepare($sql);
        $prepared_request = execute($value);

    }

    public static function getBooksAvailable(){
        $sql = 'SELECT * FROM livre WHERE idLivre NOT IN(SELECT idLivre FROM emprunt)';
        $result = array();
        foreach(Model::$pdo->query($sql) as $value){
            array_push($result,$value);
        }
        $result = json_encode($result);
        echo $result;
        return Model::$pdo->query($sql);
    }

    public static function getBorrowedBooks(){
        $sql = 'SELECT e.idLivre, l.titreLivre FROM livre l,emprunt e WHERE e.idLivre = l.idLivre';
        $result = array();
        foreach(Model::$pdo->query($sql) as $value){
            array_push($result,$value);
        }
        $result = json_encode($result);
        echo $result;
        return json_encode(Model::$pdo->query($sql));
    }

    public static function getMembers(){
        $sql = 'SELECT * FROM adherent';
        $result = array();
        foreach(Model::$pdo->query($sql) as $value){
            array_push($result,$value);
        }
        $result = json_encode($result);
        echo($result);
        return $result ;
    }

    

    public static function getBookBorrower($idLivre){
        $sql = 'SELECT * FROM adherent WHERE idAdherent IN (SELECT idAdherent FROM emprunt WHERE idLivre = :idLivre';
        $value = array(
            "idLivre" => $idLivre
        );
        $prepared_request = Model::$pdo->prepare($sql);
        $prepared_request->execute($value);
        $prepared_request->setFetchMode(PDO::FETCH_ASSOC,0);
        return json_encode($prepared_request->fetchAll());
    }


}
    
?>