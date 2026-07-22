<?php

class Request
{
    public static function method(): string
    {
        return $_SERVER["REQUEST_METHOD"] ?? "GET";
    }

    public static function isGet(): bool
    {
        return self::method() === "GET";
    }

    public static function isPost(): bool
    {
        return self::method() === "POST";
    }

    public static function isPut(): bool
    {
        return self::method() === "PUT";
    }

    public static function isDelete(): bool
    {
        return self::method() === "DELETE";
    }

    public static function body(): array
    {
        $input = file_get_contents("php://input");

        if (empty($input)) {
            return [];
        }

        $data = json_decode($input, true);

        return is_array($data) ? $data : [];
    }
}