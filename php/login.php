<?php
session_start();

$obj = new stdClass();
$obj -> success = false;
$obj -> message = 'Username or password is invalid';

// Verification des identifiants
$username = "Utilisateur";
$password = "abc";

//Déclaration des variables de session
if ($_POST['username'] == "$username" && $_POST['password'] == $password) {
    $obj -> success = true;
    $_SESSION['user'] = $username;
}
else {
    $obj -> success = false;
}

$obj -> success = isset($_SESSION['user']);

//Suppression du cache
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);
?>
