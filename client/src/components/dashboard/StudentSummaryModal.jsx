import Button from "../common/Button";
import FormSection from "../common/FormSection";
import InputField from "../common/InputField";
import Modal from "../common/Modal";

function StudentSummaryModal({
    show,
    student,
    onClose,
}) {
    if (!show || !student) return null;

    return (
        <Modal
            show={show}
            title="Student Summary"
            onClose={onClose}
            width="700px"
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
                    col={6}
                    className="mb-2"
                    label="Student Number"
                    value={student.studentNumber}
                    disabled
                    inputClassName="field-disabled"
                />

                <InputField
                    col={6}
                    className="mb-2"
                    label="Status"
                    value={student.status}
                    disabled
                    inputClassName="field-disabled"
                />

                <InputField
                    col={12}
                    className="mb-2"
                    label="Full Name"
                    value={student.name}
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
                    col={12}
                    className="mb-2"
                    label="Course"
                    value={`${student.courseCode} - ${student.courseName}`}
                    disabled
                    inputClassName="field-disabled"
                />

                <InputField
                    col={6}
                    className="mb-2"
                    label="Year Level"
                    value={student.year}
                    disabled
                    inputClassName="field-disabled"
                />
            </div>
        </Modal>
    );
}

export default StudentSummaryModal;