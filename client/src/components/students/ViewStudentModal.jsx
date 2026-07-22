import Button from "../common/Button";
import FormSection from "../common/FormSection";
import InputField from "../common/InputField";
import Modal from "../common/Modal";

import "../../styles/ViewStudentModal.css";

function ViewStudentModal({
    show,
    student,
    onClose,
}) {
    if (!show || !student) return null;

    return (
        <Modal
            show={show}
            title="Student Information"
            onClose={onClose}
            width="md"
            footer={
                <Button
                    type="button"
                    variant="primary"
                    onClick={onClose}
                >
                    Close
                </Button>
            }
        >
            <FormSection
                title="Personal Information"
                icon="bi bi-person-vcard-fill"
            />

            <div className="row">
                <InputField
                    col={4}
                    className="mb-3"
                    label="Student ID"
                    id="studentId"
                    value={student.studentNumber}
                    disabled
                    inputClassName="field-disabled"
                />

                <InputField
                    col={4}
                    className="mb-3"
                    label="Full Name"
                    id="firstName"
                    value={student.firstName}
                    disabled
                    inputClassName="field-disabled"
                />

                <InputField
                    col={4}
                    className="mb-3"
                    label="Last Name"
                    id="lastName"
                    value={student.lastName}
                    disabled
                    inputClassName="field-disabled"
                />

                <InputField
                    col={4}
                    className="mb-3"
                    label="Gender"
                    id="gender"
                    value={student.gender}
                    disabled
                    inputClassName="field-disabled"
                />

                <InputField
                    col={4}
                    className="mb-3"
                    label="Date of Birth"
                    id="dob"
                    value={student.dateOfBirth}
                    disabled
                    inputClassName="field-disabled"
                />

                <InputField
                    col={4}
                    className="mb-3"
                    label="Status"
                    id="status"
                    value={student.status}
                    disabled
                    inputClassName="field-disabled"
                />
            </div>

            <FormSection
                title="Contact Information"
                icon="bi bi-envelope-fill"
            />

            <div className="row">
                <InputField
                    col={6}
                    className="mb-3"
                    label="Email Address"
                    id="email"
                    value={student.email}
                    disabled
                    inputClassName="field-disabled"
                />

                <InputField
                    col={6}
                    className="mb-3"
                    label="Contact Number"
                    id="contactNumber"
                    value={student.contactNumber}
                    disabled
                    inputClassName="field-disabled"
                />
            </div>

            <FormSection
                title="Academic Information"
                icon="bi bi-mortarboard-fill"
            />

            <div className="row">
                <InputField
                    col={4}
                    className="mb-3"
                    label="Course"
                    id="course"
                    value={`${student.courseCode} - ${student.courseName}`}
                    disabled
                    inputClassName="field-disabled"
                />

                <InputField
                    col={4}
                    className="mb-3"
                    label="Year Level"
                    id="yearLevel"
                    value={student.yearLevel}
                    disabled
                    inputClassName="field-disabled"
                />
            </div>
        </Modal>
    );
}

export default ViewStudentModal;