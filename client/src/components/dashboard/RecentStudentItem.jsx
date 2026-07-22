import Button from "../common/Button";

function RecentStudentItem({ student, onView }) {
    const initials = student.name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div className="recent-student-item">
            <div className="student-info">
                <div className="student-avatar">
                    {initials}
                </div>

                <div className="student-details">
                    <h6 className="student-name">
                        {student.name}
                    </h6>

                    <span className="student-number">
                        {student.studentNumber}
                    </span>

                    <p className="student-course">
                        {student.courseCode} • {student.courseName}
                    </p>
                </div>
            </div>

            <div className="student-actions">
                <span
                    className={`status-badge ${
                        student.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                    }`}
                >
                    {student.status}
                </span>

                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onView(student)}
                >
                    <i
                        className="bi bi-eye-fill"
                        aria-hidden="true"
                    ></i>

                    <span>View Details</span>
                </Button>
            </div>
        </div>
    );
}

export default RecentStudentItem;