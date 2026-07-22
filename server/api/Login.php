<?php

session_start();

require_once __DIR__ . "/../config/cors.php";
require_once __DIR__ . "/../classes/Request.php";
require_once __DIR__ . "/../controllers/AuthController.php";

header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."
    ]);

    exit;
}

$controller = new AuthController();
$controller->login(Request::body());