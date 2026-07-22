<?php

require_once __DIR__ . "/../config/cors.php";

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

require_once __DIR__ . "/../classes/Request.php";
require_once __DIR__ . "/../classes/Response.php";
require_once __DIR__ . "/../controllers/CourseController.php";

$request = new Request();
$controller = new CourseController();

switch ($request->method()) {
    case "GET":
        $controller->getAll();
        break;

    case "POST":
        $controller->create($request->body());
        break;

    case "PUT":
        if (!isset($_GET["id"]) || !is_numeric($_GET["id"])) {
            Response::error(
                "Invalid course ID.",
                [
                    "id" => "A valid course ID is required."
                ],
                400
            );

            exit;
        }

        $controller->update(
            (int) $_GET["id"],
            $request->body()
        );

        break;

    case "DELETE":
        if (!isset($_GET["id"]) || !is_numeric($_GET["id"])) {
            Response::error(
                "Invalid course ID.",
                [
                    "id" => "A valid course ID is required."
                ],
                400
            );

            exit;
        }

        $controller->delete((int) $_GET["id"]);
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