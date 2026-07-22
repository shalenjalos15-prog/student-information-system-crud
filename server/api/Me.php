<?php

session_start();

require_once __DIR__ . "/../config/cors.php";

header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."
    ]);

    exit;
}

if (
    !isset($_SESSION["user_id"]) ||
    !isset($_SESSION["username"])
) {
    http_response_code(401);

    echo json_encode([
        "success" => false,
        "message" => "Unauthorized."
    ]);

    exit;
}

echo json_encode([
    "success" => true,
    "message" => "User retrieved successfully.",
    "data" => [
        "id" => $_SESSION["user_id"],
        "username" => $_SESSION["username"]
    ]
]);