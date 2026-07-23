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
                        <Route
                            path="/dashboard"
                            element={
                                <Dashboard />
                            }
                        />
                        <Route
                            path="/employees"
                            element={
                                <Employees />
                            }
                        />
                        <Route
                            path="/employees/add"
                            element={
                                <AddEmployee />
                            }
                        />

                        <Route
                            path="/employees/edit/:id"
                            element={
                                <EditEmployee />
                            }
                        />
                        <Route
                            path="/attendance"
                            element={
                                <Attendance />
                            }
                        />

                    </Route>

                </Route>
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