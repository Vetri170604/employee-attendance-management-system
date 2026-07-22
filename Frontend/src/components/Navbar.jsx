import {
    useNavigate
} from "react-router-dom";


function Navbar() {

    const navigate =
        useNavigate();


    const username =
        localStorage.getItem(
            "username"
        ) || "Admin";


    const role =
        localStorage.getItem(
            "role"
        ) || "Admin";


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

        <header className="navbar">

            <div className="navbar-title">

                <h3>
                    Attendance Management
                </h3>

            </div>


            <div className="navbar-user">

                <div className="user-info">

                    <strong>
                        {username}
                    </strong>

                    <small>
                        {role}
                    </small>

                </div>


                <button
                    onClick={
                        handleLogout
                    }
                    className="navbar-logout"
                >

                    Logout

                </button>

            </div>

        </header>

    );

}


export default Navbar;