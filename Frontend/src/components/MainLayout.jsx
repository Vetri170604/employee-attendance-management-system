import { useState } from "react";

import {
    Outlet,
    NavLink,
    useNavigate
} from "react-router-dom";


function MainLayout() {

    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] =
        useState(false);
    const getUserDetails = () => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            return {
                username: "User",
                role: "User"
            };

        }


        try {

            const payload =
                JSON.parse(
                    atob(
                        token
                            .split(".")[1]
                            .replace(/-/g, "+")
                            .replace(/_/g, "/")
                    )
                );


            return {

                username:
                    payload.username ||
                    "User",

                role:
                    payload.role ||
                    "User"

            };

        } catch (error) {

            console.error(
                "JWT Decode Error:",
                error
            );


            return {

                username: "User",

                role: "User"

            };

        }

    };


    const user =
        getUserDetails();
    const handleLogout = () => {

        const confirmLogout =
            window.confirm(
                "Are you sure you want to logout?"
            );


        if (!confirmLogout) {

            return;

        }


        localStorage.removeItem(
            "token"
        );


        localStorage.removeItem(
            "access_token"
        );


        localStorage.removeItem(
            "user"
        );


        navigate(
            "/login",
            {
                replace: true
            }
        );

    };
    const menuItems = [

        {
            path: "/dashboard",
            label: "Dashboard",
            icon: "📊"
        },

        {
            path: "/employees",
            label: "Employees",
            icon: "👥"
        },

        {
            path: "/attendance",
            label: "Attendance",
            icon: "📅"
        }

    ];


    return (

        <div className="app-layout">
            {
                sidebarOpen && (

                    <div
                        className="sidebar-overlay"
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                    />

                )
            }
            <aside
                className={
                    sidebarOpen
                        ? "sidebar sidebar-open"
                        : "sidebar"
                }
            >


                {/* Logo */}

                <div className="sidebar-logo">

                    <div className="logo-icon">
                        A
                    </div>

                    <div>

                        <h2>
                            Attendify
                        </h2>

                        <span>
                            Management System
                        </span>

                    </div>

                </div>


                {/* Navigation */}

                <nav className="sidebar-nav">


                    <p className="nav-title">
                        MAIN MENU
                    </p>


                    {
                        menuItems.map(
                            (item) => (

                                <NavLink
                                    key={
                                        item.path
                                    }
                                    to={
                                        item.path
                                    }
                                    onClick={() =>
                                        setSidebarOpen(
                                            false
                                        )
                                    }
                                    className={
                                        ({
                                            isActive
                                        }) =>
                                            isActive
                                                ? "nav-item active"
                                                : "nav-item"
                                    }
                                >

                                    <span className="nav-icon">

                                        {
                                            item.icon
                                        }

                                    </span>


                                    <span>

                                        {
                                            item.label
                                        }

                                    </span>

                                </NavLink>

                            )
                        )
                    }


                </nav>


                {/* Sidebar Bottom */}

                <div className="sidebar-bottom">


                    <div className="sidebar-info">

                        <span>
                            🔒
                        </span>

                        <div>

                            <strong>
                                Secure System
                            </strong>

                            <small>
                                JWT Protected
                            </small>

                        </div>

                    </div>


                    <button
                        className="sidebar-logout"
                        onClick={
                            handleLogout
                        }
                    >

                        <span>
                            🚪
                        </span>

                        Logout

                    </button>


                </div>


            </aside>

            <div className="main-area">
                <header className="top-navbar">


                    {/* Mobile Menu */}

                    <button
                        className="mobile-menu-btn"
                        onClick={() =>
                            setSidebarOpen(
                                !sidebarOpen
                            )
                        }
                    >

                        ☰

                    </button>


                    {/* Page Title */}

                    <div className="top-title">

                        <h3>
                            Attendance Management
                        </h3>

                        <p>
                            Manage your organization
                        </p>

                    </div>


                    {/* User Profile */}

                    <div className="user-profile">


                        <div className="user-avatar">

                            {
                                user.username
                                    .charAt(0)
                                    .toUpperCase()
                            }

                        </div>


                        <div className="user-details">

                            <strong>

                                {
                                    user.username
                                }

                            </strong>


                            <span
                                className={
                                    user.role
                                        .toLowerCase() ===
                                    "admin"
                                        ? "role-badge admin"
                                        : "role-badge"
                                }
                            >

                                {
                                    user.role
                                }

                            </span>
                        </div>
                    </div>
                </header>
                <main className="content-area">
                    <Outlet />
                </main>
            </div>
        </div>

    );
}
export default MainLayout;