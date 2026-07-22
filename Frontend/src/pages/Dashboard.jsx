// import {
//     useEffect,
//     useState
// } from "react";

// import API from "../services/api.js";


// function Dashboard() {

//     // =====================================
//     // STATE
//     // =====================================

//     const [statistics, setStatistics] =
//         useState(null);


//     const [loading, setLoading] =
//         useState(true);


//     const [error, setError] =
//         useState("");


//     // =====================================
//     // LOAD DASHBOARD DATA
//     // =====================================

//     useEffect(() => {

//         fetchDashboard();

//     }, []);


//     // =====================================
//     // FETCH DASHBOARD API
//     // =====================================

//     const fetchDashboard = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             console.log(
//                 "Fetching dashboard data..."
//             );


//             const response =
//                 await API.get(
//                     "/dashboard/statistics"
//                 );


//             console.log(
//                 "Dashboard Response:",
//                 response.data
//             );


//             setStatistics(
//                 response.data.data
//             );


//         } catch (error) {

//             console.error(
//                 "Dashboard Error:",
//                 error
//             );


//             // =================================
//             // JWT EXPIRED / INVALID
//             // =================================

//             if (
//                 error.response?.status === 401
//             ) {

//                 localStorage.removeItem(
//                     "access_token"
//                 );


//                 window.location.href =
//                     "/login";


//                 return;

//             }


//             // =================================
//             // OTHER ERROR
//             // =================================

//             setError(
//                 error.response?.data?.message ||
//                 "Failed to load dashboard statistics"
//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // =====================================
//     // LOADING SCREEN
//     // =====================================

//     if (loading) {

//         return (

//             <div
//                 className="dashboard-page"
//                 style={{
//                     padding: "30px"
//                 }}
//             >

//                 <h1>
//                     Dashboard
//                 </h1>

//                 <p>
//                     Loading dashboard...
//                 </p>

//             </div>

//         );

//     }


//     // =====================================
//     // ERROR SCREEN
//     // =====================================

//     if (error) {

//         return (

//             <div
//                 className="dashboard-page"
//                 style={{
//                     padding: "30px"
//                 }}
//             >

//                 <h1>
//                     Dashboard
//                 </h1>


//                 <p
//                     className="error-message"
//                     style={{
//                         color: "red"
//                     }}
//                 >

//                     {error}

//                 </p>


//                 <button
//                     onClick={
//                         fetchDashboard
//                     }
//                 >

//                     Try Again

//                 </button>

//             </div>

//         );

//     }


//     // =====================================
//     // NO DATA
//     // =====================================

//     if (!statistics) {

//         return (

//             <div
//                 className="dashboard-page"
//                 style={{
//                     padding: "30px"
//                 }}
//             >

//                 <h1>
//                     Dashboard
//                 </h1>

//                 <p>
//                     No dashboard data available.
//                 </p>

//             </div>

//         );

//     }


//     // =====================================
//     // DASHBOARD UI
//     // =====================================

//     return (

//         <div className="dashboard-page">


//             {/* ============================== */}
//             {/* PAGE HEADER */}
//             {/* ============================== */}

//             <div className="page-header">

//                 <h1>
//                     Dashboard
//                 </h1>

//                 <p>
//                     Attendance Management Overview
//                 </p>

//             </div>


//             {/* ============================== */}
//             {/* STATISTICS CARDS */}
//             {/* ============================== */}

//             <div className="dashboard-cards">


//                 {/* TOTAL EMPLOYEES */}

//                 <div className="dashboard-card">

//                     <div className="card-icon">
//                         👥
//                     </div>


//                     <div>

//                         <p>
//                             Total Employees
//                         </p>


//                         <h2>

//                             {
//                                 statistics.total_employees
//                             }

//                         </h2>

//                     </div>

//                 </div>


//                 {/* ACTIVE EMPLOYEES */}

//                 <div className="dashboard-card">

//                     <div className="card-icon">
//                         ✅
//                     </div>


//                     <div>

//                         <p>
//                             Active Employees
//                         </p>


//                         <h2>

//                             {
//                                 statistics.active_employees
//                             }

//                         </h2>

//                     </div>

//                 </div>


//                 {/* PRESENT TODAY */}

//                 <div className="dashboard-card">

//                     <div className="card-icon">
//                         🟢
//                     </div>


//                     <div>

//                         <p>
//                             Present Today
//                         </p>


//                         <h2>

//                             {
//                                 statistics.present_today
//                             }

//                         </h2>

//                     </div>

//                 </div>


//                 {/* ABSENT TODAY */}

//                 <div className="dashboard-card">

//                     <div className="card-icon">
//                         🔴
//                     </div>


//                     <div>

//                         <p>
//                             Absent Today
//                         </p>


//                         <h2>

//                             {
//                                 statistics.absent_today
//                             }

//                         </h2>

//                     </div>

//                 </div>


//             </div>


//             {/* ============================== */}
//             {/* DEPARTMENT STATISTICS */}
//             {/* ============================== */}

//             <div className="department-section">


//                 <h2>
//                     Department-wise Employee Count
//                 </h2>


//                 <div className="department-grid">


//                     {
//                         statistics.department_wise?.map(

//                             (
//                                 department,
//                                 index
//                             ) => (

//                                 <div
//                                     className="department-card"
//                                     key={index}
//                                 >


//                                     <h3>

//                                         {
//                                             department.department
//                                         }

//                                     </h3>


//                                     <p>
//                                         Employees
//                                     </p>


//                                     <strong>

//                                         {
//                                             department.employee_count
//                                         }

//                                     </strong>


//                                 </div>

//                             )

//                         )
//                     }


//                 </div>


//             </div>


//         </div>

//     );

// }


// export default Dashboard;

// // import { useEffect, useState } from "react";
// // import API from "../services/api.js";

// // function Dashboard() {

// //     const [statistics, setStatistics] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState("");

// //     // =========================================
// //     // FETCH DASHBOARD DATA
// //     // =========================================

// //     const fetchDashboard = async () => {

// //         try {

// //             setLoading(true);
// //             setError("");

// //             const response = await API.get(
// //                 "/dashboard"
// //             );

// //             console.log(
// //                 "Dashboard Response:",
// //                 response.data
// //             );

// //             setStatistics(
// //                 response.data.data
// //             );

// //         } catch (error) {

// //             console.error(
// //                 "Dashboard Error:",
// //                 error
// //             );

// //             if (
// //                 error.response?.status === 401
// //             ) {

// //                 localStorage.clear();

// //                 window.location.href =
// //                     "/login";

// //                 return;

// //             }

// //             setError(
// //                 error.response?.data?.message ||
// //                 "Failed to load dashboard"
// //             );

// //         } finally {

// //             setLoading(false);

// //         }

// //     };


// //     // =========================================
// //     // LOAD DASHBOARD
// //     // =========================================

// //     useEffect(() => {

// //         fetchDashboard();

// //     }, []);


// //     // =========================================
// //     // LOADING
// //     // =========================================

// //     if (loading) {

// //         return (

// //             <div className="dashboard-page">

// //                 <div className="dashboard-loading">

// //                     <h2>
// //                         Loading Dashboard...
// //                     </h2>

// //                     <p>
// //                         Please wait while we load
// //                         your dashboard data.
// //                     </p>

// //                 </div>

// //             </div>

// //         );

// //     }


// //     // =========================================
// //     // ERROR
// //     // =========================================

// //     if (error) {

// //         return (

// //             <div className="dashboard-page">

// //                 <div className="dashboard-error">

// //                     <h2>
// //                         Dashboard Error
// //                     </h2>

// //                     <p>
// //                         {error}
// //                     </p>

// //                     <button
// //                         onClick={fetchDashboard}
// //                     >
// //                         Try Again
// //                     </button>

// //                 </div>

// //             </div>

// //         );

// //     }


// //     if (!statistics) {

// //         return (

// //             <div className="dashboard-page">

// //                 <h2>
// //                     No Dashboard Data
// //                 </h2>

// //             </div>

// //         );

// //     }


// //     // =========================================
// //     // ATTENDANCE PERCENTAGE
// //     // =========================================

// //     const totalToday =

// //         Number(
// //             statistics.present_today || 0
// //         ) +

// //         Number(
// //             statistics.absent_today || 0
// //         );


// //     const attendancePercentage =

// //         totalToday > 0

// //             ? (
// //                 Number(
// //                     statistics.present_today || 0
// //                 ) /
// //                 totalToday
// //             ) * 100

// //             : 0;


// //     return (

// //         <div className="dashboard-page">

// //             {/* ================================= */}
// //             {/* HEADER */}
// //             {/* ================================= */}

// //             <div className="dashboard-header">

// //                 <div>

// //                     <h1>
// //                         Dashboard
// //                     </h1>

// //                     <p>
// //                         Attendance Management Overview
// //                     </p>

// //                 </div>


// //                 <button
// //                     className="refresh-btn"
// //                     onClick={fetchDashboard}
// //                 >
// //                     🔄 Refresh
// //                 </button>

// //             </div>


// //             {/* ================================= */}
// //             {/* STATISTICS CARDS */}
// //             {/* ================================= */}

// //             <div className="dashboard-cards">


// //                 {/* Total Employees */}

// //                 <div className="dashboard-card">

// //                     <div className="dashboard-card-icon">
// //                         👥
// //                     </div>

// //                     <div>

// //                         <p>
// //                             Total Employees
// //                         </p>

// //                         <h2>
// //                             {
// //                                 statistics.total_employees
// //                             }
// //                         </h2>

// //                     </div>

// //                 </div>


// //                 {/* Active Employees */}

// //                 <div className="dashboard-card">

// //                     <div className="dashboard-card-icon">
// //                         ✅
// //                     </div>

// //                     <div>

// //                         <p>
// //                             Active Employees
// //                         </p>

// //                         <h2>
// //                             {
// //                                 statistics.active_employees
// //                             }
// //                         </h2>

// //                     </div>

// //                 </div>


// //                 {/* Present Today */}

// //                 <div className="dashboard-card present-card">

// //                     <div className="dashboard-card-icon">
// //                         🟢
// //                     </div>

// //                     <div>

// //                         <p>
// //                             Present Today
// //                         </p>

// //                         <h2>
// //                             {
// //                                 statistics.present_today
// //                             }
// //                         </h2>

// //                     </div>

// //                 </div>


// //                 {/* Absent Today */}

// //                 <div className="dashboard-card absent-card">

// //                     <div className="dashboard-card-icon">
// //                         🔴
// //                     </div>

// //                     <div>

// //                         <p>
// //                             Absent Today
// //                         </p>

// //                         <h2>
// //                             {
// //                                 statistics.absent_today
// //                             }
// //                         </h2>

// //                     </div>

// //                 </div>


// //             </div>


// //             {/* ================================= */}
// //             {/* TODAY ATTENDANCE ANALYTICS */}
// //             {/* ================================= */}

// //             <div className="analytics-section">

// //                 <div className="analytics-card">

// //                     <h2>
// //                         Today's Attendance
// //                     </h2>

// //                     <p>
// //                         Present vs Absent
// //                     </p>


// //                     <div className="attendance-progress">

// //                         <div
// //                             className="attendance-progress-bar"
// //                             style={{
// //                                 width:
// //                                     `${attendancePercentage}%`
// //                             }}
// //                         />

// //                     </div>


// //                     <div className="attendance-percentage">

// //                         <strong>
// //                             {
// //                                 attendancePercentage.toFixed(1)
// //                             }%
// //                         </strong>

// //                         <span>
// //                             Attendance Rate
// //                         </span>

// //                     </div>

// //                 </div>


// //                 {/* Present / Absent Summary */}

// //                 <div className="analytics-card">

// //                     <h2>
// //                         Today's Summary
// //                     </h2>


// //                     <div className="summary-row">

// //                         <span>
// //                             🟢 Present
// //                         </span>

// //                         <strong>
// //                             {
// //                                 statistics.present_today
// //                             }
// //                         </strong>

// //                     </div>


// //                     <div className="summary-row">

// //                         <span>
// //                             🔴 Absent
// //                         </span>

// //                         <strong>
// //                             {
// //                                 statistics.absent_today
// //                             }
// //                         </strong>

// //                     </div>


// //                     <div className="summary-row">

// //                         <span>
// //                             👥 Total Marked
// //                         </span>

// //                         <strong>
// //                             {
// //                                 totalToday
// //                             }
// //                         </strong>

// //                     </div>

// //                 </div>

// //             </div>


// //             {/* ================================= */}
// //             {/* DEPARTMENT STATISTICS */}
// //             {/* ================================= */}

// //             <div className="department-section">

// //                 <div className="section-header">

// //                     <div>

// //                         <h2>
// //                             Department-wise Employees
// //                         </h2>

// //                         <p>
// //                             Active employees by department
// //                         </p>

// //                     </div>

// //                 </div>


// //                 <div className="department-grid">

// //                     {
// //                         statistics.department_wise_count &&
// //                         statistics.department_wise_count.length > 0

// //                             ? statistics.department_wise_count.map(

// //                                 (department, index) => (

// //                                     <div
// //                                         className="department-card"
// //                                         key={index}
// //                                     >

// //                                         <div className="department-icon">
// //                                             🏢
// //                                         </div>

// //                                         <div>

// //                                             <h3>
// //                                                 {
// //                                                     department.department
// //                                                 }
// //                                             </h3>

// //                                             <p>
// //                                                 Employees
// //                                             </p>

// //                                             <strong>
// //                                                 {
// //                                                     department.employee_count
// //                                                 }
// //                                             </strong>

// //                                         </div>

// //                                     </div>

// //                                 )

// //                             )

// //                             : (

// //                                 <div className="no-data">

// //                                     No department data available.

// //                                 </div>

// //                             )

// //                     }

// //                 </div>

// //             </div>


// //         </div>

// //     );

// // }

// // export default Dashboard;


import {
    useEffect,
    useState
} from "react";

import API from "../services/api.js";


function Dashboard() {

    // =========================================
    // STATE
    // =========================================

    const [dashboardData, setDashboardData] = useState({

        employees: {

            total: 0,

            active: 0,

            inactive: 0

        },

        departments: [],

        attendance: {

            present: 0,

            absent: 0,

            late: 0,

            leave: 0

        }

    });


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");


    const [refreshing, setRefreshing] =
        useState(false);


    // =========================================
    // FETCH DASHBOARD DATA
    // =========================================

    const fetchDashboardData = async (
        isRefresh = false
    ) => {

        try {

            if (isRefresh) {

                setRefreshing(true);

            } else {

                setLoading(true);

            }


            setError("");


            const response =
                await API.get(
                    "/dashboard/stats"
                );


            console.log(
                "Dashboard Response:",
                response.data
            );


            if (
                response.data &&
                response.data.data
            ) {

                setDashboardData(
                    response.data.data
                );

            }


        } catch (error) {

            console.error(
                "Dashboard Error:",
                error
            );


            setError(

                error.response?.data?.message ||

                "Unable to load dashboard data"

            );

        } finally {

            setLoading(false);

            setRefreshing(false);

        }

    };


    // =========================================
    // INITIAL LOAD
    // =========================================

    useEffect(() => {

        fetchDashboardData();

    }, []);


    // =========================================
    // LOADING SCREEN
    // =========================================

    if (loading) {

        return (

            <div className="page-content">

                <div className="dashboard-loading">

                    <div className="loading-spinner">
                    </div>

                    <h3>
                        Loading Dashboard
                    </h3>

                    <p>
                        Fetching the latest
                        organization statistics...
                    </p>

                </div>

            </div>

        );

    }


    // =========================================
    // ERROR SCREEN
    // =========================================

    if (error) {

        return (

            <div className="page-content">

                <div className="dashboard-error">

                    <div className="dashboard-error-icon">
                        ⚠️
                    </div>

                    <h2>
                        Unable to Load Dashboard
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button

                        className="btn btn-primary"

                        onClick={() =>
                            fetchDashboardData()
                        }

                    >

                        Try Again

                    </button>

                </div>

            </div>

        );

    }


    // =========================================
    // DATA
    // =========================================

    const employees =
        dashboardData.employees || {};


    const attendance =
        dashboardData.attendance || {};


    const departments =
        dashboardData.departments || [];


    // =========================================
    // ATTENDANCE TOTAL
    // =========================================

    const attendanceTotal =

        Number(attendance.present || 0) +

        Number(attendance.absent || 0) +

        Number(attendance.late || 0) +

        Number(attendance.leave || 0);


    // =========================================
    // ATTENDANCE PERCENTAGE
    // =========================================

    const attendancePercentage =

        attendanceTotal > 0

            ?

        Math.round(

            (
                Number(
                    attendance.present || 0
                ) /

                attendanceTotal

            ) * 100

        )

            :

        0;


    // =========================================
    // UI
    // =========================================

    return (

        <div className="page-content">


            {/* =========================================
                PAGE HEADER
            ========================================= */}

            <div className="dashboard-page-header">

                <div>

                    <div className="dashboard-welcome">

                        <span>
                            👋
                        </span>

                        Welcome back, Admin

                    </div>


                    <h1>
                        Dashboard
                    </h1>


                    <p>
                        Here's an overview of your
                        organization's workforce.
                    </p>

                </div>


                <button

                    className="dashboard-refresh-btn"

                    onClick={() =>
                        fetchDashboardData(true)
                    }

                    disabled={refreshing}

                >

                    <span
                        className={
                            refreshing
                                ? "refresh-icon spinning"
                                : "refresh-icon"
                        }
                    >
                        ↻
                    </span>

                    {refreshing
                        ? "Refreshing..."
                        : "Refresh"
                    }

                </button>

            </div>


            {/* =========================================
                EMPLOYEE STATISTICS
            ========================================= */}

            <div className="dashboard-cards">


                {/* TOTAL EMPLOYEES */}

                <div className="dashboard-card premium-card">

                    <div className="card-icon employee-icon">
                        👥
                    </div>

                    <div className="card-content">

                        <p>
                            Total Employees
                        </p>

                        <h2>
                            {
                                employees.total || 0
                            }
                        </h2>

                        <span className="card-description">
                            Overall workforce
                        </span>

                    </div>

                </div>


                {/* ACTIVE EMPLOYEES */}

                <div className="dashboard-card premium-card">

                    <div className="card-icon active-icon">
                        ✓
                    </div>

                    <div className="card-content">

                        <p>
                            Active Employees
                        </p>

                        <h2>
                            {
                                employees.active || 0
                            }
                        </h2>

                        <span className="card-description success-text">
                            Currently active
                        </span>

                    </div>

                </div>


                {/* INACTIVE EMPLOYEES */}

                <div className="dashboard-card premium-card">

                    <div className="card-icon inactive-icon">
                        ⏸
                    </div>

                    <div className="card-content">

                        <p>
                            Inactive Employees
                        </p>

                        <h2>
                            {
                                employees.inactive || 0
                            }
                        </h2>

                        <span className="card-description danger-text">
                            Currently inactive
                        </span>

                    </div>

                </div>


                {/* ATTENDANCE */}

                <div className="dashboard-card premium-card">

                    <div className="card-icon attendance-icon">
                        📊
                    </div>

                    <div className="card-content">

                        <p>
                            Attendance Rate
                        </p>

                        <h2>
                            {attendancePercentage}%
                        </h2>

                        <span className="card-description">
                            Overall attendance
                        </span>

                    </div>

                </div>


            </div>


            {/* =========================================
                ATTENDANCE SUMMARY
            ========================================= */}

            <div className="dashboard-section-header">

                <div>

                    <h2>
                        Attendance Overview
                    </h2>

                    <p>
                        Current attendance statistics
                    </p>

                </div>

            </div>


            <div className="attendance-summary">


                {/* PRESENT */}

                <div className="summary-card">

                    <div className="summary-icon present-icon">
                        ✓
                    </div>

                    <div>

                        <p>
                            Present
                        </p>

                        <h2>
                            {
                                attendance.present || 0
                            }
                        </h2>

                    </div>

                </div>


                {/* ABSENT */}

                <div className="summary-card">

                    <div className="summary-icon absent-icon">
                        ×
                    </div>

                    <div>

                        <p>
                            Absent
                        </p>

                        <h2>
                            {
                                attendance.absent || 0
                            }
                        </h2>

                    </div>

                </div>


                {/* LATE */}

                <div className="summary-card">

                    <div className="summary-icon late-icon">
                        ⏱
                    </div>

                    <div>

                        <p>
                            Late
                        </p>

                        <h2>
                            {
                                attendance.late || 0
                            }
                        </h2>

                    </div>

                </div>


                {/* LEAVE */}

                <div className="summary-card">

                    <div className="summary-icon leave-icon">
                        📅
                    </div>

                    <div>

                        <p>
                            Leave
                        </p>

                        <h2>
                            {
                                attendance.leave || 0
                            }
                        </h2>

                    </div>

                </div>


            </div>


            {/* =========================================
                BOTTOM GRID
            ========================================= */}

            <div className="dashboard-bottom-grid">


                {/* =====================================
                    DEPARTMENT OVERVIEW
                ===================================== */}

                <div className="dashboard-panel">

                    <div className="panel-header">

                        <div>

                            <h2>
                                Department Overview
                            </h2>

                            <p>
                                Employees by department
                            </p>

                        </div>

                        <span className="panel-icon">
                            🏢
                        </span>

                    </div>


                    {departments.length > 0 ? (

                        <div className="department-list">

                            {departments.map(
                                (department, index) => {

                                    const count =
                                        Number(
                                            department.employee_count || 0
                                        );


                                    const total =
                                        Number(
                                            employees.total || 0
                                        );


                                    const percentage =

                                        total > 0

                                            ?

                                        Math.round(
                                            (count / total) * 100
                                        )

                                            :

                                        0;


                                    return (

                                        <div
                                            className="department-item"
                                            key={
                                                department.department ||
                                                index
                                            }
                                        >

                                            <div className="department-info">

                                                <div className="department-name">

                                                    <span className="department-dot">
                                                    </span>

                                                    <strong>
                                                        {
                                                            department.department
                                                        }
                                                    </strong>

                                                </div>

                                                <span>
                                                    {count} employees
                                                </span>

                                            </div>


                                            <div className="department-progress">

                                                <div
                                                    className="department-progress-bar"
                                                    style={{
                                                        width:
                                                            `${percentage}%`
                                                    }}
                                                >
                                                </div>

                                            </div>


                                        </div>

                                    );

                                }

                            )}

                        </div>

                    ) : (

                        <div className="dashboard-empty">

                            <span>
                                🏢
                            </span>

                            <p>
                                No department data available
                            </p>

                        </div>

                    )}

                </div>


                {/* =====================================
                    ATTENDANCE BREAKDOWN
                ===================================== */}

                <div className="dashboard-panel">

                    <div className="panel-header">

                        <div>

                            <h2>
                                Attendance Breakdown
                            </h2>

                            <p>
                                Overall attendance status
                            </p>

                        </div>

                        <span className="panel-icon">
                            📈
                        </span>

                    </div>


                    <div className="attendance-breakdown">


                        <div className="attendance-row">

                            <div>

                                <span className="attendance-label">

                                    <span className="status-dot present-dot">
                                    </span>

                                    Present

                                </span>

                            </div>

                            <strong>
                                {
                                    attendance.present || 0
                                }
                            </strong>

                        </div>


                        <div className="attendance-row">

                            <div>

                                <span className="attendance-label">

                                    <span className="status-dot absent-dot">
                                    </span>

                                    Absent

                                </span>

                            </div>

                            <strong>
                                {
                                    attendance.absent || 0
                                }
                            </strong>

                        </div>


                        <div className="attendance-row">

                            <div>

                                <span className="attendance-label">

                                    <span className="status-dot late-dot">
                                    </span>

                                    Late

                                </span>

                            </div>

                            <strong>
                                {
                                    attendance.late || 0
                                }
                            </strong>

                        </div>


                        <div className="attendance-row">

                            <div>

                                <span className="attendance-label">

                                    <span className="status-dot leave-dot">
                                    </span>

                                    Leave

                                </span>

                            </div>

                            <strong>
                                {
                                    attendance.leave || 0
                                }
                            </strong>

                        </div>


                    </div>


                    {/* Attendance Percentage */}

                    <div className="attendance-rate-box">

                        <div>

                            <span>
                                Attendance Rate
                            </span>

                            <strong>
                                {attendancePercentage}%
                            </strong>

                        </div>


                        <div className="attendance-rate-progress">

                            <div
                                className="attendance-rate-progress-bar"
                                style={{
                                    width:
                                        `${attendancePercentage}%`
                                }}
                            >
                            </div>

                        </div>

                    </div>


                </div>


            </div>


        </div>

    );

}


export default Dashboard;