import {
    useEffect,
    useState
} from "react";
import API from "../services/api.js";
function Dashboard() {
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
    useEffect(() => {

        fetchDashboardData();

    }, []);
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
    const employees =
        dashboardData.employees || {};


    const attendance =
        dashboardData.attendance || {};


    const departments =
        dashboardData.departments || [];
    const attendanceTotal =

        Number(attendance.present || 0) +

        Number(attendance.absent || 0) +

        Number(attendance.late || 0) +

        Number(attendance.leave || 0);
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
    return (
        <div className="page-content">

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
            <div className="dashboard-bottom-grid">
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