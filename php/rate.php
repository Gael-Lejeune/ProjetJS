<?php
session_start();
$obj = new stdClass();
$obj -> success = false;

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$popularity=$_POST['popularity'];
$name=$_POST['name'];
// On essayes de récupérer le contenu existant
$data = file_get_contents('../json/warframe.json');


// On récupère le JSON dans un tableau PHP
$jsonWarframes = json_decode($data, true);

// On ajoute le nouvel élement
$jsonWarframes["$name"]["popularity"] = "$popularity";

// On réencode en JSON
$contenu_json = json_encode($jsonWarframes);

// On stocke tout le JSON
file_put_contents('../json/warframe.json', $contenu_json);
 
