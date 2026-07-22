<?php

require_once __DIR__ . "/BaseModel.php";

class User extends BaseModel
{
    protected string $table = "users";

    public function __construct()
    {
        parent::__construct();
    }

    public function findByUsername(string $username): ?array
    {
        $sql = "
            SELECT *
            FROM {$this->table}
            WHERE BINARY username = ?
            LIMIT 1
        ";

        $statement = $this->execute($sql, [$username]);

        return $statement->fetch(PDO::FETCH_ASSOC) ?: null;
    }
}