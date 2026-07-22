import { useEffect, useState } from "react";

import AdminLayout from "../components/layout/AdminLayout";
import RecentStudents from "../components/dashboard/RecentStudents";
import StatCard from "../components/dashboard/StatCard";
import StudentSummaryModal from "../components/dashboard/StudentSummaryModal";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";

import { getDashboard } from "../services/api";

import "../styles/Dashboard.css";

function Dashboard() {
    const [stats, setStats] = useState([]);
    const [recentStudents, setRecentStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

    const pluralize = (count, singular, plural) =>
        count === 1 ? singular : plural;

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);

            const response = await getDashboard();

            if (!response.success) {
                setError(response.message);
                return;
            }

            const totalStudents = response.data.stats.students;
            const totalCourses = response.data.stats.courses;
            const activeStudents = response.data.stats.activeStudents;

            setStats([
                {
                    icon: "bi bi-people-fill",
                    title: pluralize(
                        totalStudents,
                        "Student",
                        "Students"
                    ),
                    value: totalStudents,
                    color: "#1E3A8A",
                },
                {
                    icon: "bi bi-book-fill",
                    title: pluralize(
                        totalCourses,
                        "Course",
                        "Courses"
                    ),
                    value: totalCourses,
                    color: "#2563EB",
                },
                {
                    icon: "bi bi-person-check-fill",
                    title: pluralize(
                        activeStudents,
                        "Active Student",
                        "Active Students"
                    ),
                    value: activeStudents,
                    color: "#16A34A",
                },
            ]);

            setRecentStudents(
                response.data.recentStudents.map((student) => ({
                    id: student.student_id,
                    studentNumber: student.student_number,
                    name: `${student.first_name} ${student.last_name}`,
                    courseCode: student.course_code,
                    courseName: student.course_name,
                    year: student.year_level,
                    status: student.status,
                }))
            );

            setError("");
        } catch (error) {
            console.error(error);

            setError(
                error.message ||
                    "Failed to load dashboard."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleViewStudent = (student) => {
        setSelectedStudent(student);
        setShowViewModal(true);
    };

    const handleCloseModal = () => {
        setShowViewModal(false);
        setSelectedStudent(null);
    };

    return (
        <AdminLayout>
            <WelcomeBanner />

            <section
                className="stats-grid"
                aria-label="Dashboard Statistics"
            >
                {stats.map((stat) => (
                    <StatCard
                        key={stat.title}
                        {...stat}
                    />
                ))}
            </section>

            <section aria-label="Recent Students">
                <RecentStudents
                    students={recentStudents}
                    loading={loading}
                    error={error}
                    onView={handleViewStudent}
                />
            </section>

            <StudentSummaryModal
                show={showViewModal}
                student={selectedStudent}
                onClose={handleCloseModal}
            />
        </AdminLayout>
    );
}

export default Dashboard;