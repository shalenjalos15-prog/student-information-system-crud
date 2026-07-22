<?php

require_once __DIR__ . "/BaseController.php";
require_once __DIR__ . "/../classes/Validator.php";
require_once __DIR__ . "/../models/Student.php";

class StudentController extends BaseController
{
    private Student $studentModel;

    public function __construct()
    {
        $this->studentModel = new Student();
    }

    public function getAll(): void
    {
        $students = $this->studentModel->getAll();

        $formatted = array_map(function ($student) {
            return [
                "id" => $student["student_id"],
                "studentNumber" => $student["student_number"],
                "firstName" => $student["first_name"],
                "lastName" => $student["last_name"],
                "fullName" => $student["first_name"] . " " . $student["last_name"],
                "gender" => $student["gender"],
                "dateOfBirth" => $student["date_of_birth"],
                "email" => $student["email"],
                "contactNumber" => $student["contact_number"],
                "courseId" => $student["course_id"],
                "courseCode" => $student["course_code"],
                "courseName" => $student["course_name"],
                "yearLevel" => $student["year_level"],
                "status" => $student["status"],
                "createdAt" => $student["created_at"],
                "updatedAt" => $student["updated_at"]
            ];
        }, $students);

        $this->success(
            "Students retrieved successfully.",
            $formatted
        );
    }

    public function create(array $data): void
    {
        $validator = new Validator($data);

        $validator->required("firstName", $data["firstName"] ?? "");
        $validator->required("lastName", $data["lastName"] ?? "");
        $validator->required("gender", $data["gender"] ?? "");
        $validator->required("dateOfBirth", $data["dateOfBirth"] ?? "");
        $validator->required("email", $data["email"] ?? "");
        $validator->required("contactNumber", $data["contactNumber"] ?? "");
        $validator->required("courseId", $data["courseId"] ?? "");
        $validator->required("yearLevel", $data["yearLevel"] ?? "");
        $validator->required("status", $data["status"] ?? "");

        if ($validator->fails()) {
            $this->validationError($validator->errors());
            return;
        }

        $studentNumber = $this->studentModel->generateStudentNumber();

        if ($this->studentModel->findByEmail($data["email"])) {
            $this->validationError([
                "email" => "Email already exists."
            ]);

            return;
        }

        $payload = [
            "student_number" => $studentNumber,
            "first_name" => $data["firstName"],
            "last_name" => $data["lastName"],
            "gender" => $data["gender"],
            "date_of_birth" => $data["dateOfBirth"],
            "email" => $data["email"],
            "contact_number" => $data["contactNumber"],
            "course_id" => $data["courseId"],
            "year_level" => $data["yearLevel"],
            "status" => $data["status"]
        ];

        $this->studentModel->create($payload);

        $this->success("Student created successfully.");
    }

    public function update(int $studentId, array $data): void
    {
        $validator = new Validator($data);

        $validator->required("firstName", $data["firstName"] ?? "");
        $validator->required("lastName", $data["lastName"] ?? "");
        $validator->required("gender", $data["gender"] ?? "");
        $validator->required("dateOfBirth", $data["dateOfBirth"] ?? "");
        $validator->required("email", $data["email"] ?? "");
        $validator->required("contactNumber", $data["contactNumber"] ?? "");
        $validator->required("courseId", $data["courseId"] ?? "");
        $validator->required("yearLevel", $data["yearLevel"] ?? "");
        $validator->required("status", $data["status"] ?? "");

        if ($validator->fails()) {
            $this->validationError($validator->errors());
            return;
        }

        $student = $this->studentModel->findById($studentId);

        if (!$student) {
            $this->error(
                "Student not found.",
                [
                    "id" => "Student does not exist."
                ],
                404
            );

            return;
        }

        $existingEmail = $this->studentModel->findByEmail($data["email"]);

        if (
            $existingEmail &&
            $existingEmail["student_id"] != $studentId
        ) {
            $this->validationError([
                "email" => "Email already exists."
            ]);

            return;
        }

        $payload = [
            "first_name" => $data["firstName"],
            "last_name" => $data["lastName"],
            "gender" => $data["gender"],
            "date_of_birth" => $data["dateOfBirth"],
            "email" => $data["email"],
            "contact_number" => $data["contactNumber"],
            "course_id" => $data["courseId"],
            "year_level" => $data["yearLevel"],
            "status" => $data["status"]
        ];

        $this->studentModel->update(
            $studentId,
            $payload
        );

        $this->success("Student updated successfully.");
    }

    public function delete(int $studentId): void
    {
        $student = $this->studentModel->findById($studentId);

        if (!$student) {
            $this->error(
                "Student not found.",
                [
                    "id" => "Student does not exist."
                ],
                404
            );

            return;
        }

        $this->studentModel->delete($studentId);

        $this->success("Student deleted successfully.");
    }
}