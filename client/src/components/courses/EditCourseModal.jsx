import { useEffect, useState } from "react";

import Button from "../common/Button";
import InputField from "../common/InputField";
import Modal from "../common/Modal";

function EditCourseModal({
    show,
    onClose,
    course,
    onSubmit,
    backendErrors,
}) {
    const [courseCode, setCourseCode] = useState("");
    const [courseName, setCourseName] = useState("");
    const [description, setDescription] = useState("");

    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setCourseCode("");
        setCourseName("");
        setDescription("");

        setErrors({});
    };

    useEffect(() => {
        if (!show) return;

        if (course) {
            setCourseCode(course.code || "");
            setCourseName(course.name || "");
            setDescription(course.description || "");
        } else {
            resetForm();
        }
    }, [show, course]);

    useEffect(() => {
        if (backendErrors) {
            setErrors(backendErrors);
        }
    }, [backendErrors]);

    const validateForm = () => {
        const newErrors = {};

        if (!courseCode.trim()) {
            newErrors.courseCode = "This field is required.";
        }

        if (!courseName.trim()) {
            newErrors.courseName = "This field is required.";
        }

        if (!description.trim()) {
            newErrors.description = "This field is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const payload = {
            courseCode: courseCode.trim(),
            courseName: courseName.trim(),
            description: description.trim(),
        };

        onSubmit?.(payload);
    };

    if (!show) return null;

    return (
        <Modal
            show={show}
            title="Edit Course Details"
            onClose={onClose}
            size="md"
            footer={
                <>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="primary"
                        form="edit-course-form"
                    >
                        Update Course
                    </Button>
                </>
            }
        >
            <form
                id="edit-course-form"
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
            >
                <div className="row">
                    <InputField
                        col={4}
                        label="Course Code"
                        id="courseCode"
                        name="courseCode"
                        value={courseCode}
                        onChange={(e) => {
                            setCourseCode(e.target.value);

                            if (errors.courseCode) {
                                setErrors((prev) => ({
                                    ...prev,
                                    courseCode: "",
                                }));
                            }
                        }}
                        placeholder="Enter course code"
                        maxLength={10}
                        required
                        error={errors.courseCode}
                    />

                    <InputField
                        col={8}
                        label="Course Name"
                        id="courseName"
                        name="courseName"
                        value={courseName}
                        onChange={(e) => {
                            setCourseName(e.target.value);

                            if (errors.courseName) {
                                setErrors((prev) => ({
                                    ...prev,
                                    courseName: "",
                                }));
                            }
                        }}
                        placeholder="Enter course name"
                        required
                        error={errors.courseName}
                    />

                    <InputField
                        col={12}
                        label="Description"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);

                            if (errors.description) {
                                setErrors((prev) => ({
                                    ...prev,
                                    description: "",
                                }));
                            }
                        }}
                        placeholder="Enter description"
                        required
                        error={errors.description}
                    />
                </div>
            </form>
        </Modal>
    );
}

export default EditCourseModal;