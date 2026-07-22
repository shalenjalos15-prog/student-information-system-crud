<?php

class Response
{
    private static function send(
        bool $success,
        string $message,
        $data = null,
        $errors = null,
        int $statusCode = 200
    ): void {
        http_response_code($statusCode);

        echo json_encode([
            "success" => $success,
            "message" => $message,
            "data" => $data,
            "errors" => $errors
        ]);

        exit;
    }

    public static function success(
        string $message,
        $data = null,
        int $statusCode = 200
    ): void {
        self::send(
            true,
            $message,
            $data,
            null,
            $statusCode
        );
    }

    public static function error(
        string $message,
        $errors = null,
        int $statusCode = 400
    ): void {
        self::send(
            false,
            $message,
            null,
            $errors,
            $statusCode
        );
    }
}