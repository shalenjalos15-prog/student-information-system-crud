<?php

require_once __DIR__ . "/BaseModel.php";

class Course extends BaseModel
{
    private string $table = "courses";

    public function getTable(): string
    {
        return $this->table;
    }

    public function getAllCourses(): array
    {
        $sql = "
            SELECT
                course_id,
                course_code,
                course_name,
                description,
                created_at,
                updated_at
            FROM {$this->table}
            ORDER BY course_name ASC
        ";

        return $this->execute($sql)->fetchAll();
    }

    public function findByCourseCode(string $courseCode): ?array
    {
        $sql = "
            SELECT *
            FROM {$this->getTable()}
            WHERE course_code = :course_code
            LIMIT 1
        ";

        $statement = $this->execute($sql, [
            "course_code" => $courseCode
        ]);

        $course = $statement->fetch();

        return $course ?: null;
    }

    public function findById(int $courseId): ?array
    {
        $sql = "
            SELECT *
            FROM {$this->getTable()}
            WHERE course_id = :course_id
            LIMIT 1
        ";

        $statement = $this->execute($sql, [
            "course_id" => $courseId
        ]);

        $course = $statement->fetch();

        return $course ?: null;
    }

    public function createCourse(array $data): bool
    {
        $sql = "
            INSERT INTO {$this->table}
            (
                course_code,
                course_name,
                description
            )
            VALUES
            (
                :course_code,
                :course_name,
                :description
            )
        ";

        $this->execute($sql, [
            ":course_code" => $data["courseCode"],
            ":course_name" => $data["courseName"],
            ":description" => $data["description"]
        ]);

        return true;
    }

    public function updateCourse(int $courseId, array $data): bool
    {
        $sql = "
            UPDATE {$this->table}
            SET
                course_code = :course_code,
                course_name = :course_name,
                description = :description,
                updated_at = NOW()
            WHERE course_id = :course_id
        ";

        $this->execute($sql, [
            ":course_id" => $courseId,
            ":course_code" => $data["courseCode"],
            ":course_name" => $data["courseName"],
            ":description" => $data["description"]
        ]);

        return true;
    }

    public function deleteCourse(int $courseId): bool
    {
        $sql = "
            DELETE FROM {$this->getTable()}
            WHERE course_id = :course_id
        ";

        $statement = $this->execute($sql, [
            "course_id" => $courseId
        ]);

        return $statement->rowCount() > 0;
    }
}