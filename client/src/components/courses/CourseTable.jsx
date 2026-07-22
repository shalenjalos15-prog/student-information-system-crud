import "../../styles/CourseTable.css";

const ACTIONS = [
    {
        key: "edit",
        icon: "bi bi-pencil-fill",
        variant: "warning",
        handler: "onEdit",
        ariaLabel: "Edit Course",
    },
    {
        key: "delete",
        icon: "bi bi-trash-fill",
        variant: "danger",
        handler: "onDelete",
        ariaLabel: "Delete Course",
    },
];

function CourseTable({
    courses = [],
    onEdit,
    onDelete,
}) {
    const handlers = {
        onEdit,
        onDelete,
    };

    return (
        <div className="course-table-card">
            <div className="table-responsive">
                <table
                    className="table align-middle"
                    aria-label="Course Records"
                >
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Description</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {courses.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="empty-table"
                                >
                                    No courses found.
                                </td>
                            </tr>
                        ) : (
                            courses.map((course) => (
                                <tr key={course.code}>
                                    <td>{course.code}</td>
                                    <td>{course.name}</td>
                                    <td>{course.description}</td>

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
                                                        handlers[action.handler]?.(course)
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

export default CourseTable;