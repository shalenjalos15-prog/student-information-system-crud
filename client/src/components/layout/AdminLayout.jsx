import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import DashboardHeader from "../dashboard/DashboardHeader";

import { getCurrentUser } from "../../services/api";

import "../../styles/AdminLayout.css";

function AdminLayout({
    children,
    notificationCount = 3,
}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const [currentUser, setCurrentUser] = useState({
        username: "Admin",
    });

    useEffect(() => {
        loadCurrentUser();
    }, []);

    const loadCurrentUser = async () => {
        try {
            const response = await getCurrentUser();

            if (response.success) {
                setCurrentUser({
                    username: response.data.username,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleSidebar = () => {
        setSidebarCollapsed((prev) => !prev);
    };

    const handleLogout = () => {
        // TODO: Connect to Logout API.
    };

    return (
        <div className="admin-layout">
            <Sidebar collapsed={sidebarCollapsed} />

            <div
                className={`admin-main ${
                    sidebarCollapsed ? "collapsed" : ""
                }`}
            >
                <DashboardHeader
                    userName={currentUser.username}
                    onToggleSidebar={handleToggleSidebar}
                    onLogout={handleLogout}
                />

                <main className="admin-content">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;