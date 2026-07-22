import { useEffect, useRef, useState } from "react";

import ProfileDropdown from "./ProfileDropdown";

import "../../styles/DashboardHeader.css";

function DashboardHeader({
    userName = "Admin",
    onToggleSidebar,
    onLogout,
}) {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const profileRef = useRef(null);

    const toggleProfileMenu = () => {
        setShowProfileMenu((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowProfileMenu(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <header className="app-header">
            <div className="app-header-left">
                <button
                    type="button"
                    className="header-icon-btn"
                    aria-label="Toggle Sidebar"
                    onClick={onToggleSidebar}
                >
                    <i
                        className="bi bi-list"
                        aria-hidden="true"
                    ></i>
                </button>
            </div>

            <div className="app-header-center"></div>

            <div className="app-header-right">
                <div
                    className="profile-menu-wrapper"
                    ref={profileRef}
                >
                    <button
                        type="button"
                        className="profile-button"
                        aria-label="Profile"
                        onClick={toggleProfileMenu}
                    >
                        <div className="profile-avatar">
                            <i
                                className="bi bi-person-circle"
                                aria-hidden="true"
                            ></i>
                        </div>

                        <i
                            className={`bi bi-chevron-down profile-arrow ${
                                showProfileMenu ? "rotate" : ""
                            }`}
                            aria-hidden="true"
                        ></i>
                    </button>

                    {showProfileMenu && (
                        <ProfileDropdown
                            username={userName}
                            role="Administrator"
                            onLogout={onLogout}
                            onClose={() => setShowProfileMenu(false)}
                        />
                    )}
                </div>
            </div>
        </header>
    );
}

export default DashboardHeader;