import {
    NavLink,
    useNavigate
} from "react-router-dom";


function Sidebar() {

    const navigate =
        useNavigate();


    const handleLogout = () => {

        localStorage.removeItem(
            "access_token"
        );

        localStorage.removeItem(
            "username"
        );

        localStorage.removeItem(
            "role"
        );


        navigate(
            "/login"
        );

    };


    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                <h2>
                    Attendance
                </h2>

                <span>
                    Management System
                </span>

            </div>


            <nav className="sidebar-menu">


                <NavLink
                    to="/dashboard"
                    className="sidebar-link"
                >

                    📊

                    <span>
                        Dashboard
                    </span>

                </NavLink>


                <NavLink
                    to="/employees"
                    className="sidebar-link"
                >

                    👥

                    <span>
                        Employees
                    </span>

                </NavLink>


                <NavLink
                    to="/attendance"
                    className="sidebar-link"
                >

                    📅

                    <span>
                        Attendance
                    </span>

                </NavLink>


            </nav>


            <div className="sidebar-bottom">

                <button
                    onClick={
                        handleLogout
                    }
                    className="logout-button"
                >

                    🚪

                    <span>
                        Logout
                    </span>

                </button>

            </div>

        </aside>

    );

}


export default Sidebar;