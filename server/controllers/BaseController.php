<?php

require_once __DIR__ . "/../classes/Response.php";

abstract class BaseController
{
    protected function success(
        string $message,
        $data = null,
        int $statusCode = 200
    ): void {
        Response::success(
            $message,
            $data,
            $statusCode
        );
    }

    protected function error(
        string $message,
        $errors = null,
        int $statusCode = 400
    ): void {
        Response::error(
            $message,
            $errors,
            $statusCode
        );
    }

    protected function validationError(array $errors): void
    {
        $this->error(
            "Validation failed.",
            $errors,
            422
        );
    }
}