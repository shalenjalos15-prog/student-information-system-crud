<?php

require_once __DIR__ . "/../config/Database.php";

abstract class BaseModel
{
    protected PDO $connection;
    protected Database $database;

    public function __construct()
    {
        $this->database = new Database();
        $this->connection = $this->database->connect();
    }

    protected function execute(string $sql, array $params = []): PDOStatement
    {
        $statement = $this->connection->prepare($sql);
        $statement->execute($params);

        return $statement;
    }

    protected function fetch(string $sql, array $params = []): ?array
    {
        $result = $this->execute($sql, $params)
            ->fetch(PDO::FETCH_ASSOC);

        return $result ?: null;
    }

    protected function fetchAll(string $sql, array $params = []): array
    {
        return $this->execute($sql, $params)
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    protected function executeUpdate(string $sql, array $params = []): bool
    {
        return $this->execute($sql, $params)
            ->rowCount() > 0;
    }

    protected function lastInsertId(): int
    {
        return (int) $this->connection->lastInsertId();
    }

    protected function getConnection(): PDO
    {
        return $this->connection;
    }
}