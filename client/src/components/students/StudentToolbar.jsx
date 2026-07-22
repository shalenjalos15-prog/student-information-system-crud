import Button from "../common/Button";

import "../../styles/StudentToolbar.css";

function StudentToolbar({
    searchPlaceholder = "Search by Student ID or Name...",
    searchValue = "",
    onSearch,
    addButtonText = "Add Student",
    onAddStudent,
}) {
    return (
        <section
            className="student-toolbar"
            aria-label="Student Toolbar"
        >
            <div className="search-box">
                <i
                    className="bi bi-search"
                    aria-hidden="true"
                ></i>

                <input
                    type="search"
                    value={searchValue}
                    placeholder={searchPlaceholder}
                    aria-label="Search students"
                    onChange={(e) => onSearch?.(e.target.value)}
                />
            </div>

            <Button
                type="button"
                variant="primary"
                onClick={onAddStudent}
            >
                <i
                    className="bi bi-plus-lg"
                    aria-hidden="true"
                ></i>

                <span>{addButtonText}</span>
            </Button>
        </section>
    );
}

export default StudentToolbar;