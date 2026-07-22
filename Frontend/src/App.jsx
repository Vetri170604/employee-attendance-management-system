import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login.jsx";

import Dashboard from "./pages/Dashboard.jsx";

import Employees from "./pages/Employees.jsx";

import AddEmployee from "./pages/AddEmployee.jsx";

import EditEmployee from "./pages/EditEmployee.jsx";

import Attendance from "./pages/Attendance.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

import MainLayout from "./components/MainLayout.jsx";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ========================= */}
                {/* PUBLIC ROUTES */}
                {/* ========================= */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />


                {/* ========================= */}
                {/* PROTECTED ROUTES */}
                {/* ========================= */}

                <Route
                    element={
                        <ProtectedRoute />
                    }
                >

                    <Route
                        element={
                            <MainLayout />
                        }
                    >

                        {/* ========================= */}
                        {/* DASHBOARD */}
                        {/* ========================= */}

                        <Route
                            path="/dashboard"
                            element={
                                <Dashboard />
                            }
                        />


                        {/* ========================= */}
                        {/* EMPLOYEES */}
                        {/* ========================= */}

                        <Route
                            path="/employees"
                            element={
                                <Employees />
                            }
                        />


                        {/* ========================= */}
                        {/* ADD EMPLOYEE */}
                        {/* ========================= */}

                        <Route
                            path="/employees/add"
                            element={
                                <AddEmployee />
                            }
                        />


                        {/* ========================= */}
                        {/* EDIT EMPLOYEE */}
                        {/* ========================= */}

                        <Route
                            path="/employees/edit/:id"
                            element={
                                <EditEmployee />
                            }
                        />


                        {/* ========================= */}
                        {/* ATTENDANCE */}
                        {/* ========================= */}

                        <Route
                            path="/attendance"
                            element={
                                <Attendance />
                            }
                        />

                    </Route>

                </Route>


                {/* ========================= */}
                {/* UNKNOWN ROUTE */}
                {/* ========================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}


export default App;