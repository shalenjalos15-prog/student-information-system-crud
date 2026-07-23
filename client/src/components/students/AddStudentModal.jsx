
import { useEffect, useState } from "react";


import Button from "../common/Button";
import DateField from "../common/DateField";
import FormSection from "../common/FormSection";
import InputField from "../common/InputField";
import Modal from "../common/Modal";
import SelectField from "../common/SelectField";


import "../../styles/AddStudentModal.css";

const genderOptions = [
    { value: "", label: "Select gender", hidden: true},
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
];

const yearOptions = [
    { value: "", label: "Select year level", hidden: true},
    { value: "1st Year", label: "1st Year" },
    { value: "2nd Year", label: "2nd Year" },
    { value: "3rd Year", label: "3rd Year" },
    { value: "4th Year", label: "4th Year" }
];

const statusOptions = [
    { value: "", label: "Select status", hidden: true},
    { value: "Active", label: "Active" },
]

const getCourseOptions = (courses = []) => [
    {
        value: "",
        label: "Select course",
        hidden: true,
    },

    ...courses.map((course) => ({
        value: course.id,
        label: `${course.code} - ${course.name}`,
    })),
];

function AddStudentModal({ show, onClose, student, isEditMode, onSubmit, courses }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");
    const [status, setStatus] = useState("");

    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setGender("");
        setDob("");
        setEmail("");
        setContact("");
        setCourse("");
        setYear("");
        setStatus("");

        setErrors({});
    };

    useEffect(() => {

        if (!show) return;

        if (isEditMode && student) {

            setFirstName(student.firstName || "");
            setLastName(student.lastName || "");
            setGender(student.gender || "");
            setDob(student.dateOfBirth || "");
            setEmail(student.email || "");
            setContact(student.contactNumber || "");
            setCourse(student.courseId || "");
            setYear(student.yearLevel || "");
            setStatus(student.status || "Active");

            setErrors({});

        } else {

            resetForm();

        }

    }, [show, student, isEditMode]);


    const validateForm = () => {

        const newErrors = {};

            if (!firstName.trim()) {
              newErrors.firstName = "This field is required.";
            } else if (!/^[A-Za-z\s]+$/.test(firstName.trim())) {
                newErrors.firstName = "First name must contain letters only.";
            }

            if (!lastName.trim()) {
              newErrors.lastName = "This field is required.";
            } else if (!/^[A-Za-z\s]+$/.test(lastName.trim())) {
                newErrors.lastName = "Last name must contain letters only.";
            }

            if (!gender) {
                newErrors.gender = "Please select a gender.";
            }

            if (!dob) {
                newErrors.dob = "This field is required.";
            }

           if (!email.trim()) {
               newErrors.email = "This field is required.";
            } else if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/i.test(email.trim())) {
                newErrors.email = "Please enter a valid Gmail address.";
            }

           if (!contact.trim()) {
              newErrors.contact = "This field is required.";
            } else if (!/^09\d{9}$/.test(contact.trim())) {
                newErrors.contact = "Contact number must be 11 digits and start with 09.";
            }

           if (!course) {
              newErrors.course = "Please select a course.";
            }

            if (!year) {
               newErrors.year = "Please select a year level.";
            }

            if (!status) {
               newErrors.status = "Please select a status.";
            }

            setErrors(newErrors);

            return Object.keys(newErrors).length === 0;
        };

    const handleSubmit = () => {

        if (!validateForm()) return;

        const payload = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            gender,
            dateOfBirth: dob,
            email: email.trim(),
            contactNumber: contact.trim(),
            courseId: Number(course),
            yearLevel: year,
            status,
        };

        onSubmit(payload);
    };

    if (!show) return null;

    return (
        <Modal
            show={show}
            title={isEditMode ? "Edit Student" : "Add Student"}
            onClose={onClose}
            width="lg"
            footer={
                <>
                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                    >
                        {isEditMode ? "Update Student" : "Save Student"}
                    </Button>
                </>
            }
        >
            <FormSection
                title="Personal Information"
                icon="bi bi-person-vcard-fill"
            />

            <div className="row">

                <InputField
                    col={6}
                    className="mb-4"
                    label="First Name"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                        setFirstName(value);

                        if (errors.firstName) {
                            setErrors((prev) => ({
                                ...prev,
                                firstName: "",
                            }));
                        }
                    }}
                    required
                    error={errors.firstName}
                    placeholder="Enter first name"
                />

                <InputField
                    col={6}
                    className="mb-4"
                    label="Last Name"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                        setLastName(value);

                        if (errors.lastName) {
                            setErrors((prev) => ({
                                ...prev,
                                lastName: "",
                            }));
                        }
                    }}
                    required
                    error={errors.lastName}
                    placeholder="Enter last name"
                />

                <SelectField
                    col={6}
                    className="mb-4"
                    label="Gender"
                    id="gender"
                    value={gender}
                    onChange={(e) => {
                        setGender(e.target.value);

                         if (errors.gender) {
                            setErrors((prev) => ({
                                ...prev,
                                gender: "",
                            }));
                         }
                    }}
                    required
                    error={errors.gender}
                    options={genderOptions}
                />

                <DateField 
                    col={6}
                    className="mb-4"
                    label="Date of Birth"
                    id="dob"
                    value={dob}
                    onChange={(e) => {
                        setDob(e.target.value);

                        if (errors.dob) {
                            setErrors((prev) => ({
                                ...prev,
                                dob: "",
                            }));
                        }
                    }}
                    required
                    error={errors.dob}
                /> 

            </div>

            <FormSection
                title="Contact Information"
                icon="bi bi-envelope-fill"
            />

            <div className="row">

                <InputField
                    col={6}
                    className="mb-4"
                    label="Email Address"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^A-Za-z0-9._%+-@]/g, "");
                        setEmail(value);

                        if (errors.email) {
                            setErrors((prev) => ({
                                ...prev,
                                email: "",
                            }));
                        }
                    }}
                    required
                    error={errors.email}
                    placeholder="Enter email address"
                />

                <InputField
                    col={6}
                    className="mb-4"
                    label="Contact Number"
                    id="contact"
                    value={contact}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 11);
                        setContact(value);

                        if (errors.contact) {
                            setErrors((prev) => ({
                                ...prev,
                                contact: "",
                            }));
                        }
                    }}
                    required
                    error={errors.contact}
                    placeholder="Enter contact number"
                />

            </div>

            <FormSection
                title="Academic Information"
                icon="bi bi-mortarboard-fill"
            />

            <div className="row">

                <InputField
                    col={12}
                    className="mb-4"
                    label="Student ID"
                    id="studentId"
                    value={student?.studentNumber || ""}
                    placeholder="Automatically generated"
                    disabled
                    inputClassName="field-disabled"
                />

                <SelectField
                    col={4}
                    className="mb-4"
                    label="Course"
                    id="course"
                    value={course}
                    onChange={(e) => {
                        setCourse(e.target.value);

                        if (errors.course) {
                            setErrors((prev) => ({
                                ...prev,
                                course: "",
                            }));
                        }
                    }}
                    required
                    error={errors.course}
                    options={getCourseOptions(courses)}
                />

                <SelectField
                    col={4}
                    className="mb-4"
                    label="Year Level"
                    id="year"
                    value={year}
                    onChange={(e) => {
                        setYear(e.target.value);

                        if (errors.year) {
                            setErrors((prev) => ({
                                ...prev,
                                year: "",
                            }));
                        }
                    }}
                    required
                    error={errors.year}
                    options={yearOptions}
                />

                <SelectField
                    col={4}
                    className="mb-4"
                    label="Status"
                    id="status"
                    value={status}
                    onChange={(e)=> {
                        setStatus(e.target.value);

                        if (errors.status) {
                            setErrors((prev) => ({
                                ...prev,
                                status: "",
                            }));
                        }
                    }}
                    required
                    error={errors.status}
                    options={statusOptions}
                />

            </div>

        </Modal>
    );
}

export default AddStudentModal;