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
        $sql = `SELECT titreLivre FROM livre l where l.idLivre IN (SELECT e.idLivre FROM emprunt e WHERE e.idAdherent = :idAdherent)`;
        $value = array(
            "idAdherent" => $idAdherent
        );
        $prepared_request = Model::$pdo->prepare($sql);
        $prepared_request->execute($value);
        $prepared_request->setFetchMode(PDO::FETCH_COLUMN,0);
        return $prepared_request->fetchAll();
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