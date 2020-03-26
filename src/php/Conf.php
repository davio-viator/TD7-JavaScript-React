<?php

class Conf {

    private static $database = array(
        'hostname' => 'mysql-td7basiledavio.alwaysdata.net',
        'database' => 'td7basiledavio_td7', // à compléter avec vos données personnelles
        'login'    => '202035', // à compléter avec vos données personnelles
        'password' => 'basiledavio123'  // à compléter avec vos données personnelles
    );

    static public function getLogin() {
        return self::$database['login'];
    }

    static public function getHostname() {
        return self::$database['hostname'];
    }

    static public function getDatabase() {
        return self::$database['database'];
    }

    static public function getPassword() {
        return self::$database['password'];
    }

}

?>
