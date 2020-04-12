<?php
session_start();

// Destruction des données de la session
$_SESSION = array();

// Destruction des cookies de la session
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
    $params["path"], $params["domain"],
    $params["secure"], $params["httponly"]
);
}

// Destruction de la session.
session_destroy();

$obj = new stdClass();
$obj -> success = true;

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);
?>
