import { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

import "../../styles/Layout.css";

function Layout({ title, subtitle, children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const handleToggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div className="layout">
            <Sidebar
                collapsed={collapsed}
                showSidebar={showSidebar}
            />

            <main
                className={`layout-content ${
                    collapsed ? "collapsed" : ""
                }`}
            >
                <Header
                    title={title}
                    subtitle={subtitle}
                    onToggleSidebar={handleToggleSidebar}
                />

                {children}
            </main>
        </div>
    );
}

export default Layout;