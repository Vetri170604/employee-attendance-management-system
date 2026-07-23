
import {
    useEffect,
    useMemo,
    useState
} from "react";
import API from "../services/api.js";
import Toast
    from "../components/Toast.jsx";
function Attendance() {
    const [employees, setEmployees] =
        useState([]);
    const [attendance, setAttendance] =
        useState([]);
    const [summary, setSummary] =
        useState({

            total_records: 0,

            present_count: 0,

            absent_count: 0,

            late_count: 0,

            leave_count: 0

        });
    const [loading, setLoading] =
        useState(true);
    const [search, setSearch] =
        useState("");
    const [statusFilter, setStatusFilter] =
        useState("");
    const [showForm, setShowForm] =
        useState(false);
    const [editingAttendance, setEditingAttendance] =
        useState(null);
    const [toast, setToast] =
        useState({

            message: "",

            type: "success"

        });
    const [formData, setFormData] =
        useState({

            employee_id: "",

            attendance_date: "",

            check_in_time: "",

            check_out_time: "",

            attendance_status: "Present"

        });
    const showToast = (

        message,

        type = "success"

    ) => {

        setToast({

            message,

            type

        });

    };
    const fetchEmployees = async () => {

        try {

            const response =
                await API.get(
                    "/employees"
                );


            setEmployees(

                response.data.data || []

            );


        } catch (error) {

            console.error(

                "Employee Error:",

                error

            );


            showToast(

                "Failed to load employees",

                "error"

            );

        }

    };
    const fetchAttendance = async () => {

        try {

            const response =
                await API.get(
                    "/attendance"
                );


            setAttendance(

                response.data.data || []

            );


        } catch (error) {

            console.error(

                "Attendance Error:",

                error

            );


            showToast(

                "Failed to load attendance records",

                "error"

            );

        }

    };
    const fetchSummary = async () => {

        try {

            const response =
                await API.get(
                    "/attendance/summary"
                );


            setSummary(

                response.data.data || {}

            );


        } catch (error) {

            console.error(

                "Summary Error:",

                error

            );

        }

    };
    useEffect(() => {

        const loadData = async () => {

            setLoading(true);


            await Promise.all([

                fetchEmployees(),

                fetchAttendance(),

                fetchSummary()

            ]);


            setLoading(false);

        };


        loadData();

    }, []);
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
    const handleAdd = () => {

        setEditingAttendance(null);


        const today = new Date()

            .toISOString()

            .split("T")[0];


        setFormData({

            employee_id: "",

            attendance_date: today,

            check_in_time: "",

            check_out_time: "",

            attendance_status: "Present"

        });


        setShowForm(true);

    };
    const handleEdit = (record) => {

        setEditingAttendance(record);


        setFormData({

            employee_id:
                record.employee_id || "",

            attendance_date:
                record.attendance_date || "",

            check_in_time:
                record.check_in_time || "",

            check_out_time:
                record.check_out_time || "",

            attendance_status:
                record.attendance_status ||
                "Present"

        });


        setShowForm(true);

    };
    const handleSubmit = async (event) => {

        event.preventDefault();


        // Employee validation
        if (!formData.employee_id) {

            showToast(

                "Please select an employee",

                "error"

            );

            return;

        }
        if (!formData.attendance_date) {

            showToast(

                "Please select attendance date",

                "error"

            );

            return;

        }


        try {

            if (editingAttendance) {


                await API.put(

                    `/attendance/${editingAttendance.id}`,

                    {

                        attendance_date:
                            formData.attendance_date,

                        check_in_time:
                            formData.check_in_time ||
                            null,

                        check_out_time:
                            formData.check_out_time ||
                            null,

                        attendance_status:
                            formData.attendance_status

                    }

                );


                showToast(

                    "Attendance updated successfully",

                    "success"

                );


            }
            else {


                await API.post(

                    "/attendance",

                    {

                        employee_id:
                            Number(
                                formData.employee_id
                            ),

                        attendance_date:
                            formData.attendance_date,

                        check_in_time:
                            formData.check_in_time ||
                            null,

                        check_out_time:
                            formData.check_out_time ||
                            null,

                        attendance_status:
                            formData.attendance_status

                    }

                );


                showToast(

                    "Attendance marked successfully",

                    "success"

                );

            }
            setShowForm(false);
            setEditingAttendance(null);
            await fetchAttendance();

            await fetchSummary();
        } catch (error) {
            console.error(
                "Attendance Save Error:",
                error
            );
            console.error(

                "Backend Response:",

                error.response?.data
            );


            showToast(

                error.response?.data?.message ||

                "Failed to save attendance",

                "error"

            );

        }

    };
    const handleDelete = async (id) => {


        const confirmed =
            window.confirm(

                "Are you sure you want to delete this attendance record?"

            );


        if (!confirmed) {

            return;

        }


        try {


            await API.delete(

                `/attendance/${id}`

            );


            showToast(

                "Attendance deleted successfully",

                "success"

            );


            await fetchAttendance();

            await fetchSummary();


        } catch (error) {


            console.error(

                "Delete Error:",

                error

            );


            console.error(

                "Backend Response:",

                error.response?.data

            );


            showToast(

                error.response?.data?.message ||

                "Failed to delete attendance",

                "error"

            );

        }

    };
    const filteredAttendance =

        useMemo(() => {


            return attendance.filter(

                (record) => {


                    const searchText =

                        search

                            .toLowerCase()

                            .trim();
                    const matchesSearch =

                        !searchText ||


                        record.name

                            ?.toLowerCase()

                            .includes(
                                searchText
                            ) ||


                        record.employee_code

                            ?.toLowerCase()

                            .includes(
                                searchText
                            );
                    const matchesStatus =

                        !statusFilter ||


                        record.attendance_status ===

                        statusFilter;


                    return (

                        matchesSearch &&

                        matchesStatus

                    );

                }

            );


        }, [

            attendance,

            search,

            statusFilter

        ]);
    if (loading) {

        return (

            <div className="page-content">

                <div className="loading-state">

                    <div className="loading-spinner">
                    </div>

                    <p>
                        Loading attendance...
                    </p>

                </div>

            </div>

        );

    }
    return (

        <div className="page-content">
            <div className="page-header">

                <div>

                    <h1>
                        Attendance
                    </h1>

                    <p>
                        Track and manage employee
                        attendance records.
                    </p>

                </div>


                <button

                    className="btn btn-primary add-employee-btn"

                    onClick={handleAdd}

                >

                    + Mark Attendance

                </button>

            </div>
            <div className="attendance-summary-grid">


                {/* TOTAL */}

                <div className="attendance-summary-card">

                    <div className="summary-icon">
                        📊
                    </div>

                    <div>

                        <span>
                            Total Records
                        </span>

                        <strong>
                            {summary.total_records || 0}
                        </strong>

                    </div>

                </div>


                {/* PRESENT */}

                <div className="attendance-summary-card">

                    <div className="summary-icon">
                        ✅
                    </div>

                    <div>

                        <span>
                            Present
                        </span>

                        <strong>
                            {summary.present_count || 0}
                        </strong>

                    </div>

                </div>


                {/* ABSENT */}

                <div className="attendance-summary-card">

                    <div className="summary-icon">
                        ❌
                    </div>

                    <div>

                        <span>
                            Absent
                        </span>

                        <strong>
                            {summary.absent_count || 0}
                        </strong>

                    </div>

                </div>


                {/* LATE */}

                <div className="attendance-summary-card">

                    <div className="summary-icon">
                        ⏰
                    </div>

                    <div>

                        <span>
                            Late
                        </span>

                        <strong>
                            {summary.late_count || 0}
                        </strong>

                    </div>

                </div>


                {/* LEAVE */}

                <div className="attendance-summary-card">

                    <div className="summary-icon">
                        🏖️
                    </div>

                    <div>

                        <span>
                            Leave
                        </span>

                        <strong>
                            {summary.leave_count || 0}
                        </strong>

                    </div>

                </div>


            </div>
            <div className="employee-filter-bar">


                {/* SEARCH */}

                <div className="employee-search">

                    <span>
                        🔍
                    </span>

                    <input

                        type="text"

                        placeholder="Search employee..."

                        value={search}

                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }

                    />

                </div>


                {/* STATUS FILTER */}

                <select

                    value={statusFilter}

                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }

                >

                    <option value="">
                        All Status
                    </option>

                    <option value="Present">
                        Present
                    </option>

                    <option value="Absent">
                        Absent
                    </option>

                    <option value="Late">
                        Late
                    </option>

                    <option value="Leave">
                        Leave
                    </option>

                </select>


                {/* CLEAR */}

                <button

                    className="btn btn-secondary"

                    onClick={() => {

                        setSearch("");

                        setStatusFilter("");

                    }}

                >

                    Clear

                </button>


            </div>
            <div className="table-container">


                <table className="data-table">


                    <thead>

                        <tr>

                            <th>
                                Employee
                            </th>

                            <th>
                                Date
                            </th>

                            <th>
                                Check-In
                            </th>

                            <th>
                                Check-Out
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>


                        {filteredAttendance.length > 0 ? (

                            filteredAttendance.map(

                                (record) => (

                                    <tr
                                        key={
                                            record.id
                                        }
                                    >
                                        <td>

                                            <div className="employee-name-cell">


                                                <div className="employee-avatar">

                                                    {record.name

                                                        ?.charAt(0)

                                                        ?.toUpperCase() ||

                                                        "?"

                                                    }

                                                </div>


                                                <div>

                                                    <strong>

                                                        {
                                                            record.name ||
                                                            "-"
                                                        }

                                                    </strong>


                                                    <small>

                                                        {
                                                            record.employee_code ||
                                                            "-"
                                                        }

                                                    </small>

                                                </div>


                                            </div>

                                        </td>
                                        <td>

                                            {
                                                record.attendance_date ||
                                                "-"
                                            }

                                        </td>
                                        <td>

                                            {
                                                record.check_in_time ||
                                                "-"
                                            }

                                        </td>
                                        <td>

                                            {
                                                record.check_out_time ||
                                                "-"
                                            }

                                        </td>
                                        <td>

                                            <span

                                                className={

                                                    `status-badge ${
                                                        String(

                                                            record.attendance_status ||

                                                            "Present"

                                                        )

                                                            .toLowerCase()

                                                        ===

                                                        "present"

                                                            ? "status-active"

                                                            : "status-inactive"

                                                    }`

                                                }

                                            >

                                                {

                                                    record.attendance_status ||

                                                    "Present"

                                                }

                                            </span>

                                        </td>
                                        <td>

                                            <div className="action-buttons">


                                                {/* EDIT */}

                                                <button

                                                    type="button"

                                                    className="btn btn-primary"

                                                    onClick={() =>
                                                        handleEdit(
                                                            record
                                                        )
                                                    }

                                                >

                                                    Edit

                                                </button>


                                                {/* DELETE */}

                                                <button

                                                    type="button"

                                                    className="btn btn-danger"

                                                    onClick={() =>
                                                        handleDelete(
                                                            record.id
                                                        )
                                                    }

                                                >

                                                    Delete

                                                </button>


                                            </div>

                                        </td>


                                    </tr>

                                )

                            )

                        ) : (

                            <tr>

                                <td

                                    colSpan="6"

                                    className="empty-state"

                                >

                                    <div>

                                        <div className="empty-icon">
                                            📅
                                        </div>

                                        <h3>
                                            No Attendance Records
                                        </h3>

                                        <p>
                                            Mark attendance
                                            to see records here.
                                        </p>

                                    </div>

                                </td>

                            </tr>

                        )}


                    </tbody>


                </table>


            </div>
            {showForm && (

                <div className="modal-overlay">
                    <div className="employee-modal">
                        <div className="modal-header">

                            <div>

                                <h2>

                                    {editingAttendance

                                        ? "Edit Attendance"

                                        : "Mark Attendance"

                                    }

                                </h2>


                                <p>

                                    {editingAttendance

                                        ? "Update attendance record"

                                        : "Create a new attendance record"

                                    }

                                </p>

                            </div>


                            <button

                                type="button"

                                className="modal-close"

                                onClick={() => {

                                    setShowForm(false);

                                    setEditingAttendance(null);

                                }}

                            >

                                ×

                            </button>

                        </div>
                        <form

                            className="employee-form"

                            onSubmit={
                                handleSubmit
                            }

                        >
                            <div className="employee-form-grid">
                                <div className="form-group">

                                    <label>
                                        Employee
                                    </label>

                                    <select

                                        name="employee_id"

                                        value={
                                            formData.employee_id
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        disabled={
                                            Boolean(
                                                editingAttendance
                                            )
                                        }

                                        required

                                    >

                                        <option value="">

                                            Select Employee

                                        </option>


                                        {employees.map(

                                            (employee) => (

                                                <option

                                                    key={
                                                        employee.id
                                                    }

                                                    value={
                                                        employee.id
                                                    }

                                                >

                                                    {
                                                        employee.name
                                                    }

                                                    {" - "}

                                                    {
                                                        employee.employee_code
                                                    }

                                                </option>

                                            )

                                        )}

                                    </select>

                                </div>
                                <div className="form-group">

                                    <label>
                                        Attendance Date
                                    </label>

                                    <input

                                        type="date"

                                        name="attendance_date"

                                        value={
                                            formData.attendance_date
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        required

                                    />

                                </div>
                                <div className="form-group">

                                    <label>
                                        Check-In Time
                                    </label>

                                    <input

                                        type="time"

                                        name="check_in_time"

                                        value={
                                            formData.check_in_time
                                        }

                                        onChange={
                                            handleChange
                                        }

                                    />

                                </div>
                                <div className="form-group">

                                    <label>
                                        Check-Out Time
                                    </label>

                                    <input

                                        type="time"

                                        name="check_out_time"

                                        value={
                                            formData.check_out_time
                                        }

                                        onChange={
                                            handleChange
                                        }

                                    />

                                </div>
                                <div className="form-group">

                                    <label>
                                        Attendance Status
                                    </label>

                                    <select

                                        name="attendance_status"

                                        value={
                                            formData.attendance_status
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        required

                                    >

                                        <option value="Present">
                                            Present
                                        </option>

                                        <option value="Absent">
                                            Absent
                                        </option>

                                        <option value="Late">
                                            Late
                                        </option>

                                        <option value="Leave">
                                            Leave
                                        </option>

                                    </select>

                                </div>


                            </div>
                            <div className="modal-actions">
                              {/* CANCEL */}

                                <button

                                    type="button"

                                    className="btn btn-secondary"

                                    onClick={() => {

                                        setShowForm(false);

                                        setEditingAttendance(null);

                                    }}

                                >

                                    Cancel

                                </button>


                                {/* SUBMIT */}

                                <button

                                    type="submit"

                                    className="btn btn-primary"

                                >

                                    {editingAttendance

                                        ? "Update Attendance"

                                        : "Mark Attendance"

                                    }

                                </button>


                            </div>


                        </form>


                    </div>


                </div>

            )}
            <Toast

                message={
                    toast.message
                }

                type={
                    toast.type
                }

                onClose={() =>
                    setToast({

                        message: "",

                        type: "success"

                    })
                }

            />
        </div>

    );

}
export default Attendance;