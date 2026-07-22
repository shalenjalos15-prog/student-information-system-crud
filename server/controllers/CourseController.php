<?php

require_once __DIR__ . "/BaseController.php";
require_once __DIR__ . "/../classes/Validator.php";
require_once __DIR__ . "/../models/Course.php";

class CourseController extends BaseController
{
    private Course $courseModel;

    public function __construct()
    {
        $this->courseModel = new Course();
    }

    public function create(array $data): void
    {
        $validator = new Validator($data);

        $validator
            ->required("courseCode", "Course Code")
            ->required("courseName", "Course Name")
            ->required("description", "Description");

        if ($validator->fails()) {
            $this->validationError($validator->errors());
        }

        $existingCourse = $this->courseModel->findByCourseCode(
            trim($data["courseCode"])
        );

        if ($existingCourse) {
            $this->validationError([
                "courseCode" => "Course code already exists."
            ]);
        }

        try {
            $this->courseModel->createCourse($data);

            $this->success(
                "Course created successfully.",
                null,
                201
            );
        } catch (Throwable $exception) {
            $this->error(
                "Unable to create course.",
                [
                    "server" => "An unexpected server error occurred."
                ],
                500
            );
        }
    }

    public function update(int $courseId, array $data): void
    {
        $validator = new Validator($data);

        $validator
            ->required("courseCode", "Course Code")
            ->required("courseName", "Course Name")
            ->required("description", "Description");

        if ($validator->fails()) {
            $this->validationError($validator->errors());
        }

        $currentCourse = $this->courseModel->findById($courseId);

        if (!$currentCourse) {
            $this->error(
                "Course not found.",
                [
                    "course" => "The requested course does not exist."
                ],
                404
            );
        }

        $existingCourse = $this->courseModel->findByCourseCode(
            trim($data["courseCode"])
        );

        if (
            $existingCourse &&
            $existingCourse["course_id"] != $courseId
        ) {
            $this->validationError([
                "courseCode" => "Course code already exists."
            ]);
        }

        try {
            $this->courseModel->updateCourse($courseId, $data);

            $this->success("Course updated successfully.");
        } catch (Throwable $exception) {
            $this->error(
                "Unable to update course.",
                [
                    "server" => "An unexpected server error occurred."
                ],
                500
            );
        }
    }

    public function delete(int $courseId): void
    {
        $course = $this->courseModel->findById($courseId);

        if (!$course) {
            $this->error(
                "Course not found.",
                [
                    "course" => "The requested course does not exist."
                ],
                404
            );
        }

        try {
            $this->courseModel->deleteCourse($courseId);

            $this->success("Course deleted successfully.");
        } catch (Throwable $exception) {
            $this->error(
                "Unable to delete course.",
                [
                    "server" => "An unexpected server error occurred."
                ],
                500
            );
        }
    }

    public function getAll(): void
    {
        try {
            $courses = $this->courseModel->getAllCourses();

            $formattedCourses = array_map(function ($course) {
                return [
                    "id" => $course["course_id"],
                    "code" => $course["course_code"],
                    "name" => $course["course_name"],
                    "description" => $course["description"]
                ];
            }, $courses);

            $this->success(
                "Courses retrieved successfully.",
                $formattedCourses
            );
        } catch (Throwable $exception) {
            $this->error(
                "Unable to retrieve courses.",
                [
                    "server" => "An unexpected server error occurred."
                ],
                500
            );
        }
    }
}