import { Link } from "react-router-dom";

import Button from "../common/Button";
import RecentStudentItem from "./RecentStudentItem";

import "../../styles/RecentStudents.css";

function RecentStudents({
    students = [],
    loading = false,
    error = "",
    onView,
    onViewAll,
}) {
    return (
        <section className="recent-students">
            <div className="recent-students-header">
                <div>
                    <h3>Recent Students</h3>

                    <p>Recently added student records</p>
                </div>
            </div>

            <div className="recent-students-body">
                {loading ? (
                    <div className="recent-state">
                        Loading recent students...
                    </div>
                ) : error ? (
                    <div className="recent-state error">
                        {error}
                    </div>
                ) : students.length === 0 ? (
                    <div className="recent-state">
                        No recent students found.
                    </div>
                ) : (
                    students.map((student) => (
                        <RecentStudentItem
                            key={student.id}
                            student={student}
                            onView={onView}
                        />
                    ))
                )}
            </div>

            <div className="recent-students-footer">
                {onViewAll ? (
                    <Button
                        type="button"
                        className="view-all-link"
                        onClick={onViewAll}
                    >
                        View All Students

                        <i
                            className="bi bi-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </Button>
                ) : (
                    <Link
                        to="/students"
                        className="view-all-link"
                    >
                        View All Students

                        <i
                            className="bi bi-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </Link>
                )}
            </div>
        </section>
    );
}

export default RecentStudents;