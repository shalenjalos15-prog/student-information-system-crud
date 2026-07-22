import "../../styles/Header.css";

function Header({
    title,
    subtitle,
    showProfile = true,
    userName = "Administrator",
    userRole = "System Admin",
    avatar = "A",
    onToggleSidebar,
}) {
    return (
        <header className="dashboard-header">
            <div className="header-left">
                {onToggleSidebar && (
                    <button
                        type="button"
                        className="sidebar-toggle-btn"
                        onClick={onToggleSidebar}
                        aria-label="Toggle Sidebar"
                    >
                        <i
                            className="bi bi-list"
                            aria-hidden="true"
                        ></i>
                    </button>
                )}

                <div>
                    {title && (
                        <h2 className="page-title">
                            {title}
                        </h2>
                    )}

                    {subtitle && (
                        <p className="page-subtitle">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            {showProfile && (
                <div className="header-right">
                    <button
                        type="button"
                        className="notification-btn"
                        aria-label="Notifications"
                    >
                        <i
                            className="bi bi-bell-fill"
                            aria-hidden="true"
                        ></i>
                    </button>

                    <div className="admin-profile">
                        <div
                            className="admin-avatar"
                            aria-hidden="true"
                        >
                            {avatar}
                        </div>

                        <div>
                            <h6>{userName}</h6>
                            <small>{userRole}</small>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;