<?php

require_once __DIR__ . "/BaseModel.php";

class Dashboard extends BaseModel
{
    public function getTotalStudents(): int
    {
        $sql = "
            SELECT COUNT(*) AS total
            FROM students
        ";

        $result = $this->fetch($sql);

        return (int) ($result["total"] ?? 0);
    }

    public function getTotalCourses(): int
    {
        $sql = "
            SELECT COUNT(*) AS total
            FROM courses
        ";

        $result = $this->fetch($sql);

        return (int) ($result["total"] ?? 0);
    }

    public function getActiveStudents(): int
    {
        $sql = "
            SELECT COUNT(*) AS total
            FROM students
            WHERE status = 'Active'
        ";

        $result = $this->fetch($sql);

        return (int) ($result["total"] ?? 0);
    }

    public function getRecentStudents(int $limit = 5): array
    {
        $sql = "
            SELECT
                s.student_id,
                s.student_number,
                s.first_name,
                s.last_name,
                c.course_code,
                c.course_name,
                s.year_level,
                s.status,
                s.created_at
            FROM students s
            INNER JOIN courses c
                ON s.course_id = c.course_id
            ORDER BY s.created_at DESC
            LIMIT {$limit}
        ";

        return $this->fetchAll($sql);
    }

    public function getDashboardData(): array
    {
        return [
            "stats" => [
                "students" => $this->getTotalStudents(),
                "courses" => $this->getTotalCourses(),
                "activeStudents" => $this->getActiveStudents()
            ],
            "recentStudents" => $this->getRecentStudents()
        ];
    }
}