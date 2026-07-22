import {
    useEffect,
    useMemo,
    useState
} from "react";

import API from "../services/api.js";

import EmployeeForm
    from "../components/EmployeeForm.jsx";

import Toast
    from "../components/Toast.jsx";


function Employees() {

    // =====================================
    // STATE
    // =====================================

    const [employees, setEmployees] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [departmentFilter, setDepartmentFilter] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("");

    const [showForm, setShowForm] = useState(false);

    const [editingEmployee, setEditingEmployee] =
        useState(null);

    const [saving, setSaving] = useState(false);

    const [toast, setToast] = useState({
        message: "",
        type: "success"
    });


    // =====================================
    // FORM DATA
    // =====================================

    const [formData, setFormData] = useState({

        employee_code: "",

        name: "",

        email: "",

        phone_number: "",

        position: "",

        department: "",

        status: "Active"

    });


    // =====================================
    // FETCH EMPLOYEES
    // =====================================

    const fetchEmployees = async () => {

        try {

            setLoading(true);

            const response = await API.get(
                "/employees"
            );

            console.log(
                "Employees API Response:",
                response.data
            );


            /*
                Supports:

                {
                    data: [...]
                }

                OR

                [...]
            */

            const employeeData =
                Array.isArray(response.data)
                    ? response.data
                    : response.data.data || [];


            setEmployees(employeeData);


        } catch (error) {

            console.error(
                "Employee Fetch Error:",
                error
            );

            showToast(
                error.response?.data?.message ||
                "Failed to load employees",
                "error"
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================
    // INITIAL LOAD
    // =====================================

    useEffect(() => {

        fetchEmployees();

    }, []);


    // =====================================
    // TOAST
    // =====================================

    const showToast = (
        message,
        type = "success"
    ) => {

        setToast({

            message,

            type

        });

    };


    // =====================================
    // HANDLE FORM CHANGE
    // =====================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData((previousData) => ({

            ...previousData,

            [name]: value

        }));

    };


    // =====================================
    // RESET FORM
    // =====================================

    const resetForm = () => {

        setFormData({

            employee_code: "",

            name: "",

            email: "",

            phone_number: "",

            position: "",

            department: "",

            status: "Active"

        });

    };


    // =====================================
    // ADD EMPLOYEE
    // =====================================

    const handleAdd = () => {

        setEditingEmployee(null);

        resetForm();

        setShowForm(true);

    };


    // =====================================
    // EDIT EMPLOYEE
    // =====================================

    const handleEdit = (employee) => {

        console.log(
            "Editing Employee:",
            employee
        );


        setEditingEmployee(employee);


        setFormData({

            employee_code:
                employee.employee_code || "",

            name:
                employee.name || "",

            email:
                employee.email || "",

            phone_number:
                employee.phone_number ||
                employee.phone ||
                "",

            position:
                employee.position ||
                employee.job_title ||
                "",

            department:
                employee.department || "",

            status:
                employee.status || "Active"

        });


        setShowForm(true);

    };


    // =====================================
    // ADD / UPDATE EMPLOYEE
    // =====================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);


        try {

            if (editingEmployee) {

                await API.put(

                    `/employees/${editingEmployee.id}`,

                    formData

                );


                showToast(

                    "Employee updated successfully",

                    "success"

                );

            } else {

                await API.post(

                    "/employees",

                    formData

                );


                showToast(

                    "Employee added successfully",

                    "success"

                );

            }


            setShowForm(false);

            setEditingEmployee(null);

            resetForm();


            await fetchEmployees();


        } catch (error) {

            console.error(

                "Save Employee Error:",

                error

            );


            showToast(

                error.response?.data?.message ||

                error.response?.data?.msg ||

                "Failed to save employee",

                "error"

            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================
    // DELETE EMPLOYEE
    // =====================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(

                "Are you sure you want to delete this employee?"

            );


        if (!confirmed) {

            return;

        }


        try {

            await API.delete(

                `/employees/${id}`

            );


            showToast(

                "Employee deleted successfully",

                "success"

            );


            await fetchEmployees();


        } catch (error) {

            console.error(

                "Delete Employee Error:",

                error

            );


            showToast(

                error.response?.data?.message ||

                "Failed to delete employee",

                "error"

            );

        }

    };


    // =====================================
    // DEPARTMENTS
    // =====================================

    const departments = useMemo(() => {

        return [

            ...new Set(

                employees

                    .map(
                        employee =>
                            employee.department
                    )

                    .filter(Boolean)

            )

        ];

    }, [employees]);


    // =====================================
    // FILTER EMPLOYEES
    // =====================================

    const filteredEmployees = useMemo(() => {

        return employees.filter(
            (employee) => {

                const searchText =
                    search
                        .toLowerCase()
                        .trim();


                const employeeName =
                    employee.name
                        ?.toLowerCase() || "";


                const employeeCode =
                    employee.employee_code
                        ?.toLowerCase() || "";


                const employeeEmail =
                    employee.email
                        ?.toLowerCase() || "";


                const employeePhone =
                    (
                        employee.phone_number ||
                        employee.phone ||
                        ""
                    )
                        .toLowerCase();


                const matchesSearch =

                    !searchText ||

                    employeeName.includes(
                        searchText
                    ) ||

                    employeeCode.includes(
                        searchText
                    ) ||

                    employeeEmail.includes(
                        searchText
                    ) ||

                    employeePhone.includes(
                        searchText
                    );


                const matchesDepartment =

                    !departmentFilter ||

                    employee.department ===
                    departmentFilter;


                const matchesStatus =

                    !statusFilter ||

                    employee.status ===
                    statusFilter;


                return (

                    matchesSearch &&

                    matchesDepartment &&

                    matchesStatus

                );

            }

        );

    }, [

        employees,

        search,

        departmentFilter,

        statusFilter

    ]);


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="page-content">

                <div className="loading-state">

                    <div className="loading-spinner">
                    </div>

                    <p>
                        Loading employees...
                    </p>

                </div>

            </div>

        );

    }


    // =====================================
    // UI
    // =====================================

    return (

        <div className="page-content">


            {/* =================================
                HEADER
            ================================= */}

            <div className="page-header">

                <div>

                    <h1>
                        Employees
                    </h1>

                    <p>
                        Manage your organization's
                        employee records.
                    </p>

                </div>


                <button

                    type="button"

                    className="btn btn-primary add-employee-btn"

                    onClick={handleAdd}

                >

                    + Add Employee

                </button>

            </div>


            {/* =================================
                FILTER BAR
            ================================= */}

            <div className="employee-filter-bar">


                {/* Search */}

                <div className="employee-search">

                    <span>
                        🔍
                    </span>

                    <input

                        type="text"

                        placeholder="Search name, code, email or phone..."

                        value={search}

                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }

                    />

                </div>


                {/* Department */}

                <select

                    value={departmentFilter}

                    onChange={(e) =>
                        setDepartmentFilter(
                            e.target.value
                        )
                    }

                >

                    <option value="">
                        All Departments
                    </option>


                    {departments.map(
                        (department) => (

                            <option
                                key={department}
                                value={department}
                            >

                                {department}

                            </option>

                        )
                    )}

                </select>


                {/* Status */}

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

                    <option value="Active">
                        Active
                    </option>

                    <option value="Inactive">
                        Inactive
                    </option>

                </select>


                {/* Clear */}

                <button

                    type="button"

                    className="btn btn-secondary"

                    onClick={() => {

                        setSearch("");

                        setDepartmentFilter("");

                        setStatusFilter("");

                    }}

                >

                    Clear

                </button>

            </div>


            {/* =================================
    EMPLOYEE TABLE
================================= */}

<div className="table-container">

    <table className="data-table">

        {/* =================================
            TABLE HEADER
        ================================= */}

        <thead>

            <tr>

                <th>
                    Employee Code
                </th>

                <th>
                    Name
                </th>

                <th>
                    Email
                </th>

                <th>
                    Phone Number
                </th>

                <th>
                    Position
                </th>

                <th>
                    Department
                </th>

                <th>
                    Status
                </th>

                <th>
                    Actions
                </th>

            </tr>

        </thead>


        {/* =================================
            TABLE BODY
        ================================= */}

        <tbody>

            {filteredEmployees.length > 0 ? (

                filteredEmployees.map((employee) => (

                    <tr key={employee.id}>


                        {/* =========================
                            EMPLOYEE CODE
                        ========================== */}

                        <td>

                            <strong>
                                {employee.employee_code || "-"}
                            </strong>

                        </td>


                        {/* =========================
                            NAME
                        ========================== */}

                        <td>

                            <div className="employee-name-cell">

                                <div className="employee-avatar">

                                    {employee.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "?"}

                                </div>

                                <span>

                                    {employee.name || "-"}

                                </span>

                            </div>

                        </td>


                        {/* =========================
                            EMAIL
                        ========================== */}

                        <td>

                            {employee.email || "-"}

                        </td>


                        {/* =========================
                            PHONE NUMBER
                        ========================== */}

                        <td>

                            {employee.phone_number ||
                             employee.phone ||
                             employee.mobile ||
                             employee.contact_number ||
                             "-"}

                        </td>


                        {/* =========================
                            POSITION
                        ========================== */}

                        <td>

                            {employee.position ||
                             employee.job_title ||
                             employee.designation ||
                             "-"}

                        </td>


                        {/* =========================
                            DEPARTMENT
                        ========================== */}

                        <td>

                            {employee.department || "-"}

                        </td>


                        {/* =========================
                            STATUS
                        ========================== */}

                        <td>

                            <span
                                className={
                                    String(employee.status)
                                        .toLowerCase() === "active"
                                        ? "status-badge status-active"
                                        : "status-badge status-inactive"
                                }
                            >

                                {employee.status || "Active"}

                            </span>

                        </td>


                        {/* =========================
                            ACTIONS
                        ========================== */}

                        <td>

                            <div className="action-buttons">


                                {/* EDIT */}

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() =>
                                        handleEdit(employee)
                                    }
                                >

                                    Edit

                                </button>


                                {/* DELETE */}

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() =>
                                        handleDelete(employee.id)
                                    }
                                >

                                    Delete

                                </button>


                            </div>

                        </td>


                    </tr>

                ))

            ) : (


                /* =========================
                   NO EMPLOYEES
                ========================== */

                <tr>

                    <td
                        colSpan="8"
                        className="empty-state"
                    >

                        <div>

                            <div className="empty-icon">
                                👥
                            </div>

                            <h3>
                                No Employees Found
                            </h3>

                            <p>
                                Try changing your filters
                                or add a new employee.
                            </p>

                        </div>

                    </td>

                </tr>

            )}

        </tbody>

    </table>

</div>

            {/* =================================
                ADD / EDIT MODAL
            ================================= */}

            {showForm && (

                <EmployeeForm

                    formData={formData}

                    handleChange={handleChange}

                    handleSubmit={handleSubmit}

                    onCancel={() => {

                        setShowForm(false);

                        setEditingEmployee(null);

                        resetForm();

                    }}

                    editing={
                        Boolean(
                            editingEmployee
                        )
                    }

                    saving={saving}

                />

            )}


            {/* =================================
                TOAST
            ================================= */}

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


export default Employees;