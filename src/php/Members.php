<?php

require_once('./Model.php');

class Members{

    public static function borrowBook($idAdherent,$idLivre){
        $sql = `INSERT INTO emprunt VALUE(:idAdherent,:idLivre)`;
        $value = array(
            "idAdherent" => $idAdherent,
            "idLivre" => $idLivre
        );
        $prepared_request = Model::$pdo->prepare($sql);
        $prepared_request->execute($value);
    }

    public static function getBorrowedBooks($idAdherent){
        $sql = 'SELECT titreLivre FROM livre l WHERE l.idLivre IN(SELECT e.idLivre FROM emprunt e WHERE e.idAdherent ='.$idAdherent.')';
        $result = array();
        foreach(Model::$pdo->query($sql) as $value){
            array_push($result,$value);
        }
        echo json_encode($result);
    }

    public static function returnBook($idLivre){
        $sql = `DELETE FROM emprunt WHERE idLivre = :idLivre`;
        $value = array(
            "idLivre" => $idLivre
        );
        $prepared_request = Model::$pdo->prepare($sql);
        $prepared_request->execute($value);
    }
}


?>