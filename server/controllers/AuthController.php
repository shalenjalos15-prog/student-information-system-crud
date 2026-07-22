<?php

require_once __DIR__ . "/BaseController.php";
require_once __DIR__ . "/../classes/Validator.php";
require_once __DIR__ . "/../models/User.php";

class AuthController extends BaseController
{
    private User $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    public function login(array $data): void
    {
        $validator = new Validator($data);

        $validator->required("username", "Username");
        $validator->required("password", "Password");

        if ($validator->fails()) {
            $this->error(
                "Validation failed.",
                $validator->errors(),
                422
            );

            return;
        }

        $user = $this->userModel->findByUsername($data["username"]);

        if (!$user || !password_verify($data["password"], $user["password"])) {
            $this->error(
                "Invalid username or password.",
                null,
                401
            );

            return;
        }

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $_SESSION["user_id"] = $user["id"];
        $_SESSION["username"] = $user["username"];

        $this->success(
            "Login successful.",
            [
                "username" => $user["username"]
            ]
        );
    }
}