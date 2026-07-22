import { useEffect, useState } from "react";

import ConfirmModal from "../components/common/ConfirmModal";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import AddStudentModal from "../components/students/AddStudentModal";
import StudentTable from "../components/students/StudentTable";
import StudentToolbar from "../components/students/StudentToolbar";
import ViewStudentModal from "../components/students/ViewStudentModal";

import {
    createStudent,
    deleteStudent,
    getCourses,
    getStudents,
    updateStudent,
} from "../services/api";

import { showError, showSuccess } from "../utils/toast";

import "../styles/Dashboard.css";
import "../styles/Students.css";

function Students() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [showFormModal, setShowFormModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        loadStudents();
        loadCourses();
    }, []);

    const handleToggleSidebar = () => {
        setSidebarCollapsed((prev) => !prev);
    };

    const loadStudents = async () => {
        try {
            const response = await getStudents();

            setStudents(response.data ?? []);
        } catch (error) {
            console.error(error);
        }
    };

    const loadCourses = async () => {
        try {
            const response = await getCourses();

            setCourses(response.data ?? []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveStudent = async (payload) => {
        try {
            if (isEditMode) {
                await updateStudent(
                    selectedStudent.id,
                    payload
                );

                showSuccess("Student updated successfully.");
            } else {
                await createStudent(payload);

                showSuccess("Student added successfully.");
            }

            await loadStudents();

            closeFormModal();
        } catch (error) {
            showError(
                error.message ||
                    "Unable to save student."
            );

            console.error(error);
        }
    };

    const filteredStudents = students.filter((student) => {
        const search = searchTerm.trim().toLowerCase();

        return (
            student.studentNumber?.toLowerCase().includes(search) ||
            student.fullName?.toLowerCase().includes(search) ||
            student.courseCode?.toLowerCase().includes(search) ||
            student.courseName?.toLowerCase().includes(search)
        );
    });

    const closeFormModal = () => {
        setShowFormModal(false);
        setSelectedStudent(null);
        setIsEditMode(false);
    };

    const closeViewModal = () => {
        setShowViewModal(false);
        setSelectedStudent(null);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedStudent(null);
    };

    const handleAddClick = () => {
        setSelectedStudent(null);
        setIsEditMode(false);
        setShowFormModal(true);
    };

    const handleEditClick = (student) => {
        setSelectedStudent(student);
        setIsEditMode(true);
        setShowFormModal(true);
    };

    const handleViewClick = (student) => {
        setSelectedStudent(student);
        setShowViewModal(true);
    };

    const handleDeleteClick = (student) => {
        setSelectedStudent(student);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!selectedStudent) return;

        try {
            await deleteStudent(selectedStudent.id);

            await loadStudents();

            closeDeleteModal();

            showSuccess("Student deleted successfully.");
        } catch (error) {
            showError(
                error.message ||
                    "Unable to delete student."
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
                    title="Students"
                    subtitle="Manage all student records."
                    showProfile={false}
                    onToggleSidebar={handleToggleSidebar}
                />

                <section className="student-content">
                    <StudentToolbar
                        searchValue={searchTerm}
                        onSearch={setSearchTerm}
                        onAddStudent={handleAddClick}
                    />

                    <StudentTable
                        students={filteredStudents}
                        onView={handleViewClick}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />
                </section>
            </main>

            <AddStudentModal
                show={showFormModal}
                onClose={closeFormModal}
                student={selectedStudent}
                isEditMode={isEditMode}
                onSubmit={handleSaveStudent}
                courses={courses}
            />

            <ViewStudentModal
                show={showViewModal}
                student={selectedStudent}
                onClose={closeViewModal}
            />

            <ConfirmModal
                show={showDeleteModal}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                title="Delete Student"
                message="Are you sure you want to delete this student record? This action cannot be undone."
                icon="bi bi-exclamation-triangle-fill"
                iconClassName="confirm-icon"
                confirmText="Delete"
                cancelText="Cancel"
                confirmVariant="danger"
                cancelVariant="secondary"
                confirmAutoFocus
            />
        </div>
    );
}

export default Students;