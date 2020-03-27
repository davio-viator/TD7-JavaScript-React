<?php

require('./MediaLibrary.php');
require('./Members.php');

if(!$_GET==null){
    if($_GET['action'] == 'callMembers'){
        MediaLibrary::getMembers();
    }
    if($_GET['action'] == 'callAvailable'){
        MediaLibrary::getBooksAvailable();
    }
    if($_GET['action'] == 'callBorroweds'){
        MediaLibrary::getBorrowedBooks();
    }
    if($_GET['action'] == 'addMember'){
        MediaLibrary::addMember($_GET['name']);
    }
    if($_GET['action'] == 'addAvailable'){
        MediaLibrary::addBook($_GET['name']);
    }
}

?>