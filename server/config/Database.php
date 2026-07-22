<?php

class Database
{
    private string $host = "localhost";
    private string $databaseName = "student_information_system";
    private string $username = "root";
    private string $password = "";

    private ?PDO $connection = null;

    public function connect(): PDO
    {
        if ($this->connection !== null) {
            return $this->connection;
        }

        try {
            $dsn = "mysql:host={$this->host};dbname={$this->databaseName};charset=utf8mb4";

            $this->connection = new PDO(
                $dsn,
                $this->username,
                $this->password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );

            return $this->connection;
        } catch (PDOException $exception) {
            throw new RuntimeException(
                "Database connection failed.",
                500,
                $exception
            );
        }
    }
}