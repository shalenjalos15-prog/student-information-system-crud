import Button from "../common/Button";

import "../../styles/CourseToolbar.css";

function CourseToolbar({
    searchPlaceholder = "Search by Course Code or Course Name...",
    searchValue = "",
    onSearch,
    addButtonText = "Add Course",
    onAddCourse,
}) {
    return (
        <section
            className="course-toolbar"
            aria-label="Course Toolbar"
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
                    aria-label="Search courses"
                    onChange={(e) => onSearch?.(e.target.value)}
                />
            </div>

            <Button
                type="button"
                variant="primary"
                onClick={onAddCourse}
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

export default CourseToolbar;