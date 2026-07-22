import { useEffect, useState } from "react";

import AddCourseModal from "../components/courses/AddCourseModal";
import CourseTable from "../components/courses/CourseTable";
import CourseToolbar from "../components/courses/CourseToolbar";
import EditCourseModal from "../components/courses/EditCourseModal";
import ConfirmModal from "../components/common/ConfirmModal";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

import {
    createCourse,
    deleteCourse,
    getCourses,
    updateCourse,
} from "../services/api";

import { showError, showSuccess } from "../utils/toast";

import "../styles/Courses.css";
import "../styles/Dashboard.css";

function Courses() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedCourse, setSelectedCourse] = useState(null);

    const [courseErrors, setCourseErrors] = useState({});
    const [editCourseErrors, setEditCourseErrors] = useState({});

    useEffect(() => {
        loadCourses();
    }, []);

    const handleToggleSidebar = () => {
        setSidebarCollapsed((prev) => !prev);
    };

    const filteredCourses = courses.filter((course) => {
        const search = searchTerm.trim().toLowerCase();

        return (
            course.code?.toLowerCase().includes(search) ||
            course.name?.toLowerCase().includes(search) ||
            course.description?.toLowerCase().includes(search)
        );
    });

    const loadCourses = async () => {
        try {
            const response = await getCourses();
            setCourses(response.data ?? []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateCourse = async (payload) => {
        try {
            await createCourse(payload);

            await loadCourses();

            setCourseErrors({});
            setShowAddModal(false);

            showSuccess("Course added successfully.");
        } catch (error) {
            if (error.errors) {
                setCourseErrors(error.errors);
                return;
            }

            showError(
                error.message ||
                    "Unable to add course."
            );

            console.error(error);
        }
    };

    const handleUpdateCourse = async (payload) => {
        try {
            await updateCourse(selectedCourse.id, payload);

            await loadCourses();

            setEditCourseErrors({});

            closeEditModal();

            showSuccess("Course updated successfully.");
        } catch (error) {
            if (error.errors) {
                setEditCourseErrors(error.errors);
                return;
            }

            showError(
                error.message ||
                    "Unable to update course."
            );

            console.error(error);
        }
    };

    const handleAddClick = () => {
        setSelectedCourse(null);
        setCourseErrors({});
        setShowAddModal(true);
    };

    const handleEditClick = (course) => {
        setSelectedCourse(course);
        setShowEditModal(true);
    };

    const handleDeleteClick = (course) => {
        setSelectedCourse(course);
        setShowDeleteModal(true);
    };

    const closeEditModal = () => {
        setEditCourseErrors({});
        setShowEditModal(false);
        setSelectedCourse(null);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedCourse(null);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedCourse) return;

        try {
            await deleteCourse(selectedCourse.id);

            await loadCourses();

            closeDeleteModal();

            showSuccess("Course deleted successfully.");
        } catch (error) {
            showError(
                error.message ||
                    "Unable to delete course."
            );

            console.error(error);
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar collapsed={sidebarCollapsed} />

            <main
                className={`dashboard-content ${
                    sidebarCollapsed ? "collapsed" : ""
                }`}
            >
                <Header
                    title="Courses"
                    subtitle="Manage all available courses."
                    showProfile={false}
                    onToggleSidebar={handleToggleSidebar}
                />

                <section className="course-content">
                    <CourseToolbar
                        searchValue={searchTerm}
                        onSearch={setSearchTerm}
                        onAddCourse={handleAddClick}
                    />

                    <CourseTable
                        courses={filteredCourses}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />
                </section>
            </main>

            <AddCourseModal
                show={showAddModal}
                onClose={() => {
                    setCourseErrors({});
                    setShowAddModal(false);
                }}
                onSubmit={handleCreateCourse}
                backendErrors={courseErrors}
            />

            <EditCourseModal
                show={showEditModal}
                course={selectedCourse}
                onClose={closeEditModal}
                onSubmit={handleUpdateCourse}
                backendErrors={editCourseErrors}
            />

            <ConfirmModal
                show={showDeleteModal}
                title="Delete Course"
                message="Are you sure you want to delete this course record?"
                onClose={closeDeleteModal}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
}

export default Courses;