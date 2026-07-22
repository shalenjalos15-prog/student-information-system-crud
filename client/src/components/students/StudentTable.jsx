import "../../styles/StudentTable.css";

const ACTIONS = [
    {
        key: "view",
        icon: "bi bi-eye-fill",
        variant: "primary",
        handler: "onView",
        ariaLabel: "View Student",
    },
    {
        key: "edit",
        icon: "bi bi-pencil-fill",
        variant: "warning",
        handler: "onEdit",
        ariaLabel: "Edit Student",
    },
    {
        key: "delete",
        icon: "bi bi-trash-fill",
        variant: "danger",
        handler: "onDelete",
        ariaLabel: "Delete Student",
    },
];

function StudentTable({
    students = [],
    onView,
    onEdit,
    onDelete,
}) {
    const handlers = {
        onView,
        onEdit,
        onDelete,
    };

    return (
        <div className="student-table-card">
            <div className="table-responsive">
                <table
                    className="table align-middle"
                    aria-label="Student Records"
                >
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Full Name</th>
                            <th>Course</th>
                            <th>Year Level</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="empty-table"
                                >
                                    No student records found.
                                </td>
                            </tr>
                        ) : (
                            students.map((student) => (
                                <tr key={student.id}>
                                    <td className="student-id">
                                        {student.studentNumber}
                                    </td>

                                    <td className="student-name">
                                        {student.fullName}
                                    </td>

                                    <td className="student-course">
                                        {student.courseName}
                                    </td>

                                    <td>{student.yearLevel}</td>

                                    <td>
                                        <span
                                            className={`status-badge ${
                                                student.status === "Active"
                                                    ? "status-active"
                                                    : "status-inactive"
                                            }`}
                                        >
                                            {student.status}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="action-buttons">
                                            {ACTIONS.map((action) => (
                                                <button
                                                    key={action.key}
                                                    type="button"
                                                    className={`btn btn-sm btn-outline-${action.variant}`}
                                                    aria-label={action.ariaLabel}
                                                    title={action.ariaLabel}
                                                    onClick={() =>
                                                        handlers[action.handler]?.(
                                                            student
                                                        )
                                                    }
                                                >
                                                    <i
                                                        className={action.icon}
                                                        aria-hidden="true"
                                                    ></i>
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudentTable;