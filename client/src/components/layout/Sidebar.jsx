import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../../assets/school_logo.png";

import ConfirmModal from "../common/ConfirmModal";

import "../../styles/Sidebar.css";

const navigation = [
    {
        to: "/dashboard",
        icon: "bi bi-speedometer2",
        label: "Dashboard",
    },
    {
        to: "/courses",
        icon: "bi bi-journal-bookmark-fill",
        label: "Manage Courses",
    },
    {
        to: "/students",
        icon: "bi bi-people-fill",
        label: "Manage Students",
    },
];

function Sidebar({ collapsed = false }) {
    const navigate = useNavigate();

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const openLogoutModal = (e) => {
        e.preventDefault();
        setShowLogoutModal(true);
    };

    const closeLogoutModal = () => {
        setShowLogoutModal(false);
    };

    const confirmLogout = () => {
        setShowLogoutModal(false);
        navigate("/");
    };

    return (
        <>
            <aside
                className={`sidebar ${collapsed ? "collapsed" : ""}`}
            >
                <div className="sidebar-top">
                    <div className="sidebar-header">
                        <img
                            src={logo}
                            alt="School Logo"
                            className="sidebar-logo"
                        />

                        {!collapsed && (
                            <h1 className="sidebar-title">
                                Student Information System
                            </h1>
                        )}
                    </div>

                    <nav className="sidebar-menu">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className="sidebar-link"
                            >
                                <i
                                    className={item.icon}
                                    aria-hidden="true"
                                ></i>

                                {!collapsed && (
                                    <span>{item.label}</span>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <NavLink
                    to="/"
                    className="sidebar-link logout-link"
                    onClick={openLogoutModal}
                >
                    <i
                        className="bi bi-box-arrow-left"
                        aria-hidden="true"
                    ></i>

                    {!collapsed && (
                        <span>Logout</span>
                    )}
                </NavLink>
            </aside>

            <ConfirmModal
                show={showLogoutModal}
                onClose={closeLogoutModal}
                onConfirm={confirmLogout}
                title="Logout"
                message="Are you sure you want to logout from the Student Information System?"
                icon="bi bi-box-arrow-left"
                iconClassName="confirm-icon"
                confirmText="Logout"
                cancelText="Stay"
                confirmVariant="danger"
                cancelVariant="secondary"
            />
        </>
    );
}

export default Sidebar;