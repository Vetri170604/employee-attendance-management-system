import { useState } from "react";
import {
    useNavigate
} from "react-router-dom";
import API from "../services/api.js";
function Login() {

    const navigate =
        useNavigate();
    const [formData, setFormData] = useState({

        username: "",

        password: ""

    });
    const [error, setError] =
        useState("");


    const [loading, setLoading] =
        useState(false);
    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData({

            ...formData,

            [name]: value

        });

    };
    const handleSubmit = async (event) => {

        event.preventDefault();


        setError("");

        setLoading(true);


        try {

            console.log(
                "Sending Login Request:",
                formData
            );
            const response =
                await API.post(

                    "/auth/login",

                    {

                        username:
                            formData.username,

                        password:
                            formData.password

                    }

                );


            console.log(
                "Login Response:",
                response.data
            );
            localStorage.setItem(
                "access_token",
                response.data.access_token
            );
            console.log(
                "JWT Saved:",
                response.data.access_token
            );
            localStorage.setItem(

                "username",

                response.data.username ||
                formData.username

            );
            localStorage.setItem(

                "role",

                response.data.role ||
                "Admin"

            );
            console.log(
                "JWT Saved:",
                localStorage.getItem(
                    "access_token"
                )
            );
            navigate(
                "/dashboard"
            );


        }

        catch (error) {

            console.error(
                "Login Error:",
                error
            );


            if (
                error.response &&
                error.response.data
            ) {

                setError(

                    error.response.data.message ||
                    error.response.data.msg ||
                    "Invalid username or password"

                );

            }

            else {

                setError(
                    "Unable to connect to server"
                );

            }

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="login-page">
            <div className="login-container">
                <div className="login-brand">


                    {/* Logo */}

                    <div className="login-brand-icon">

                        📊

                    </div>


                    {/* Title */}

                    <h1>

                        Smart Attendance
                        <br />

                        <span>
                            Management System
                        </span>

                    </h1>


                    {/* Description */}

                    <p>

                        Manage employee attendance,
                        track performance, and monitor
                        workforce activities from one
                        powerful platform.

                    </p>


                    {/* Features */}

                    <div className="login-features">


                        <div className="login-feature">

                            <span>
                                ✓
                            </span>

                            <span>
                                Employee Management
                            </span>

                        </div>


                        <div className="login-feature">

                            <span>
                                ✓
                            </span>

                            <span>
                                Smart Attendance Tracking
                            </span>

                        </div>


                        <div className="login-feature">

                            <span>
                                ✓
                            </span>

                            <span>
                                Real-time Attendance Reports
                            </span>

                        </div>


                    </div>


                </div>
                <div className="login-card">


                    {/* Header */}

                    <div className="login-header">


                        <div className="login-welcome-icon">

                            🔐

                        </div>


                        <h2>

                            Welcome Back

                        </h2>


                        <p className="login-card-subtitle">

                            Sign in to access your
                            attendance dashboard

                        </p>


                    </div>


                    {/* Error */}

                    {error && (

                        <div className="error-message">

                            <span>
                                ⚠️
                            </span>

                            <span>
                                {error}
                            </span>

                        </div>

                    )}


                    {/* Form */}

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >


                        {/* Username */}

                        <div className="form-group">


                            <label>

                                Username

                            </label>


                            <div className="input-wrapper">


                                <span className="input-icon">

                                    👤

                                </span>


                                <input

                                    type="text"

                                    name="username"

                                    value={
                                        formData.username
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    placeholder="Enter your username"

                                    required

                                    autoComplete="username"

                                />

                            </div>


                        </div>


                        {/* Password */}

                        <div className="form-group">


                            <label>

                                Password

                            </label>


                            <div className="input-wrapper">


                                <span className="input-icon">

                                    🔒

                                </span>


                                <input

                                    type="password"

                                    name="password"

                                    value={
                                        formData.password
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    placeholder="Enter your password"

                                    required

                                    autoComplete="current-password"

                                />

                            </div>


                        </div>


                        {/* Login Button */}

                        <button

                            type="submit"

                            className="primary-button"

                            disabled={
                                loading
                            }

                        >


                            {loading ? (

                                <>

                                    <span className="button-spinner">
                                    </span>

                                    Logging in...

                                </>

                            ) : (

                                <>

                                    Sign In

                                    <span className="button-arrow">

                                        →

                                    </span>

                                </>

                            )}


                        </button>


                    </form>


                    {/* Security */}

                    <div className="login-security">

                        Secure Admin Access

                    </div>


                    {/* Footer */}

                    <div className="login-footer">

                        © 2026 Attendance Management System

                    </div>


                </div>


            </div>


        </div>

    );

}


export default Login;