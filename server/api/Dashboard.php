<?php

require_once __DIR__ . "/../config/cors.php";
require_once __DIR__ . "/../classes/Request.php";
require_once __DIR__ . "/../classes/Response.php";
require_once __DIR__ . "/../controllers/DashboardController.php";

header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

$request = new Request();
$controller = new DashboardController();

switch ($request->method()) {
    case "GET":
        $controller->index();
        break;

    default:
        Response::error(
            "Method not allowed.",
            [
                "method" => "The requested HTTP method is not supported."
            ],
            405
        );

        break;
}