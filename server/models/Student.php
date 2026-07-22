<?php

require_once __DIR__ . "/BaseModel.php";

class Student extends BaseModel
{
    private string $table = "students";

    public function getAll(): array
    {
        $sql = "
            SELECT
                s.student_id,
                s.student_number,
                s.first_name,
                s.last_name,
                s.gender,
                s.date_of_birth,
                s.email,
                s.contact_number,
                s.course_id,
                c.course_code,
                c.course_name,
                s.year_level,
                s.status,
                s.created_at,
                s.updated_at
            FROM {$this->table} s
            INNER JOIN courses c
                ON s.course_id = c.course_id
            ORDER BY s.student_number ASC
        ";

        return $this->execute($sql)->fetchAll();
    }

    public function findById(int $studentId): ?array
    {
        $sql = "
            SELECT *
            FROM {$this->table}
            WHERE student_id = ?
            LIMIT 1
        ";

        $student = $this->execute($sql, [$studentId])->fetch();

        return $student ?: null;
    }

    public function findByStudentNumber(string $studentNumber): ?array
    {
        $sql = "
            SELECT *
            FROM {$this->table}
            WHERE student_number = ?
            LIMIT 1
        ";

        $student = $this->execute($sql, [$studentNumber])->fetch();

        return $student ?: null;
    }

    public function findByEmail(string $email): ?array
    {
        $sql = "
            SELECT *
            FROM {$this->table}
            WHERE email = ?
            LIMIT 1
        ";

        $student = $this->execute($sql, [$email])->fetch();

        return $student ?: null;
    }

    public function create(array $data): bool
    {
        $sql = "
            INSERT INTO {$this->table}
            (
                student_number,
                first_name,
                last_name,
                gender,
                date_of_birth,
                email,
                contact_number,
                course_id,
                year_level,
                status
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
        ";

        return $this->execute($sql, [
            $data["student_number"],
            $data["first_name"],
            $data["last_name"],
            $data["gender"],
            $data["date_of_birth"],
            $data["email"],
            $data["contact_number"],
            $data["course_id"],
            $data["year_level"],
            $data["status"]
        ])->rowCount() > 0;
    }

    public function update(int $studentId, array $data): bool
    {
        $sql = "
            UPDATE {$this->table}
            SET
                first_name = ?,
                last_name = ?,
                gender = ?,
                date_of_birth = ?,
                email = ?,
                contact_number = ?,
                course_id = ?,
                year_level = ?,
                status = ?
            WHERE student_id = ?
        ";

        return $this->execute($sql, [
            $data["first_name"],
            $data["last_name"],
            $data["gender"],
            $data["date_of_birth"],
            $data["email"],
            $data["contact_number"],
            $data["course_id"],
            $data["year_level"],
            $data["status"],
            $studentId
        ])->rowCount() > 0;
    }

    public function delete(int $studentId): bool
    {
        $sql = "
            DELETE FROM {$this->table}
            WHERE student_id = ?
        ";

        return $this->execute($sql, [$studentId])->rowCount() > 0;
    }

    public function generateStudentNumber(): string
    {
        $year = date("Y");

        $sql = "
            SELECT student_number
            FROM {$this->table}
            WHERE student_number LIKE ?
            ORDER BY student_number DESC
            LIMIT 1
        ";

        $statement = $this->execute($sql, [
            "{$year}-%"
        ]);

        $lastStudent = $statement->fetch();

        if (!$lastStudent) {
            return "{$year}-0001";
        }

        $lastNumber = (int) substr(
            $lastStudent["student_number"],
            -4
        );

        $nextNumber = $lastNumber + 1;

        return sprintf(
            "%s-%04d",
            $year,
            $nextNumber
        );
    }
}