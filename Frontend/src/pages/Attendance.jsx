// import { useEffect, useState } from "react";

// import API from "../services/api.js";


// function Attendance() {

//     // =========================================
//     // STATE
//     // =========================================

//     const [attendance, setAttendance] =
//         useState([]);

//     const [employees, setEmployees] =
//         useState([]);

//     const [summary, setSummary] =
//         useState(null);

//     const [loading, setLoading] =
//         useState(true);

//     const [summaryLoading, setSummaryLoading] =
//         useState(false);

//     const [error, setError] =
//         useState("");

//     const [selectedEmployee, setSelectedEmployee] =
//         useState("");

//     const [selectedDate, setSelectedDate] =
//         useState("");

//     // =========================================
//     // FILTER STATES
//     // =========================================

//     const [filterDate, setFilterDate] =
//         useState("");

//     const [filterEmployee, setFilterEmployee] =
//         useState("");

//     const [filterStatus, setFilterStatus] =
//         useState("");

//     const [search, setSearch] =
//         useState("");

//     // =========================================
//     // FORM DATA
//     // =========================================

//     const [formData, setFormData] = useState({

//         employee_id: "",

//         attendance_date:
//             new Date()
//                 .toISOString()
//                 .split("T")[0],

//         check_in_time: "",

//         check_out_time: "",

//         status: "Present"

//     });


//     // =========================================
//     // LOAD DATA
//     // =========================================

//     useEffect(() => {

//         fetchAttendance();

//     }, [

//         filterEmployee,

//         filterDate,

//         filterStatus,

//         search

//     ]);


//     useEffect(() => {

//         fetchEmployees();

//         fetchAttendanceSummary();

//     }, []);


//     // =========================================
//     // GET ALL ATTENDANCE
//     // =========================================

//     const fetchAttendance = async () => {

//         try {

//             setLoading(true);

//             setError("");


//             // =====================================
//             // CREATE FILTER PARAMETERS
//             // =====================================

//             const params = {};


//             // Employee filter

//             if (filterEmployee) {

//                 params.employee_id =
//                     filterEmployee;

//             }


//             // Date filter

//             if (filterDate) {

//                 params.attendance_date =
//                     filterDate;

//             }


//             // Status filter

//             if (filterStatus) {

//                 params.status =
//                     filterStatus;

//             }


//             // Search filter

//             if (search.trim()) {

//                 params.search =
//                     search.trim();

//             }


//             console.log(
//                 "Attendance Filters:",
//                 params
//             );


//             // =====================================
//             // API REQUEST
//             // =====================================

//             const response =
//                 await API.get(

//                     "/attendance",

//                     {
//                         params
//                     }

//                 );


//             console.log(
//                 "Attendance Response:",
//                 response.data
//             );


//             // =====================================
//             // SAVE ATTENDANCE
//             // =====================================

//             setAttendance(

//                 response.data.data || []

//             );


//         } catch (error) {

//             console.error(

//                 "Failed to load attendance:",

//                 error

//             );


//             // =====================================
//             // JWT EXPIRED
//             // =====================================

//             if (
//                 error.response?.status === 401
//             ) {

//                 localStorage.clear();

//                 window.location.href =
//                     "/login";

//                 return;

//             }


//             setError(

//                 error.response?.data?.message ||

//                 "Failed to load attendance records"

//             );


//         } finally {

//             setLoading(false);

//         }

//     };


//     // =========================================
//     // GET EMPLOYEES
//     // =========================================

//     const fetchEmployees = async () => {

//         try {

//             const response =
//                 await API.get(
//                     "/employees"
//                 );


//             console.log(
//                 "Employees Response:",
//                 response.data
//             );


//             setEmployees(

//                 response.data.data || []

//             );


//         } catch (error) {

//             console.error(

//                 "Employee Error:",

//                 error

//             );


//             if (
//                 error.response?.status === 401
//             ) {

//                 localStorage.clear();

//                 window.location.href =
//                     "/login";

//             }

//         }

//     };


//     // =========================================
//     // GET ATTENDANCE SUMMARY
//     // =========================================

//     const fetchAttendanceSummary =
//         async (employeeId = "") => {

//             try {

//                 setSummaryLoading(true);


//                 let url =
//                     "/attendance/summary";


//                 // =================================
//                 // FILTER BY EMPLOYEE
//                 // =================================

//                 if (employeeId) {

//                     url +=
//                         `?employee_id=${employeeId}`;

//                 }


//                 const response =
//                     await API.get(
//                         url
//                     );


//                 console.log(
//                     "Attendance Summary:",
//                     response.data
//                 );


//                 setSummary(

//                     response.data.data

//                 );


//             } catch (error) {

//                 console.error(

//                     "Summary Error:",

//                     error

//                 );


//                 if (
//                     error.response?.status === 401
//                 ) {

//                     localStorage.clear();

//                     window.location.href =
//                         "/login";

//                     return;

//                 }


//                 setSummary(null);


//             } finally {

//                 setSummaryLoading(false);

//             }

//         };


//     // =========================================
//     // HANDLE EMPLOYEE SELECTION
//     // =========================================

//     const handleEmployeeChange =
//         (event) => {

//             const employeeId =
//                 event.target.value;


//             setSelectedEmployee(
//                 employeeId
//             );


//             setFormData({

//                 ...formData,

//                 employee_id:
//                     employeeId

//             });


//             // Update summary

//             fetchAttendanceSummary(

//                 employeeId

//             );

//         };


//     // =========================================
//     // HANDLE FORM CHANGE
//     // =========================================

//     const handleChange =
//         (event) => {

//             const {
//                 name,
//                 value
//             } = event.target;


//             setFormData({

//                 ...formData,

//                 [name]: value

//             });

//         };


//     // =========================================
//     // MARK ATTENDANCE
//     // =========================================

//     const handleSubmit =
//         async (event) => {

//             event.preventDefault();


//             if (
//                 !formData.employee_id
//             ) {

//                 alert(
//                     "Please select an employee"
//                 );

//                 return;

//             }


//             if (
//                 !formData.attendance_date
//             ) {

//                 alert(
//                     "Please select attendance date"
//                 );

//                 return;

//             }


//             try {

//                 await API.post(

//                     "/attendance",

//                     formData

//                 );


//                 alert(
//                     "Attendance marked successfully"
//                 );


//                 // Refresh attendance

//                 fetchAttendance();


//                 // Refresh summary

//                 fetchAttendanceSummary(

//                     formData.employee_id

//                 );


//                 // Reset form

//                 setFormData({

//                     employee_id: "",

//                     attendance_date:
//                         new Date()
//                             .toISOString()
//                             .split("T")[0],

//                     check_in_time: "",

//                     check_out_time: "",

//                     status: "Present"

//                 });


//                 setSelectedEmployee("");

//             } catch (error) {

//                 console.error(

//                     "Mark Attendance Error:",

//                     error

//                 );


//                 alert(

//                     error.response?.data
//                         ?.message ||

//                     "Failed to mark attendance"

//                 );

//             }

//         };


//     // =========================================
//     // DELETE ATTENDANCE
//     // =========================================

//     const handleDelete =
//         async (id) => {

//             const confirmDelete =
//                 window.confirm(

//                     "Are you sure you want to delete this attendance record?"

//                 );


//             if (
//                 !confirmDelete
//             ) {

//                 return;

//             }


//             try {

//                 await API.delete(

//                     `/attendance/${id}`

//                 );


//                 alert(
//                     "Attendance deleted successfully"
//                 );


//                 // Refresh attendance

//                 fetchAttendance();


//                 // Refresh summary

//                 fetchAttendanceSummary(

//                     selectedEmployee

//                 );


//             } catch (error) {

//                 console.error(

//                     "Delete Error:",

//                     error

//                 );


//                 alert(

//                     error.response?.data
//                         ?.message ||

//                     "Failed to delete attendance"

//                 );

//             }

//         };


//     // =========================================
//     // CLEAR ALL FILTERS
//     // =========================================

//     const clearFilters = () => {

//         setSearch("");

//         setFilterEmployee("");

//         setFilterDate("");

//         setFilterStatus("");

//     };


//     // =========================================
//     // LOADING
//     // =========================================

//     if (loading) {

//         return (

//             <div
//                 style={{
//                     padding: "40px"
//                 }}
//             >

//                 <h2>
//                     Attendance
//                 </h2>

//                 <p>
//                     Loading attendance records...
//                 </p>

//             </div>

//         );

//     }


//     // =========================================
//     // UI
//     // =========================================

//     return (

//         <div
//             style={{
//                 padding: "30px",
//                 background: "#f5f7fb",
//                 minHeight: "100vh"
//             }}
//         >


//             {/* ================================= */}
//             {/* PAGE HEADER */}
//             {/* ================================= */}

//             <div
//                 style={{
//                     marginBottom: "25px"
//                 }}
//             >

//                 <h1>
//                     Attendance Management
//                 </h1>

//                 <p>
//                     Manage employee attendance
//                     and track attendance percentage.
//                 </p>

//             </div>


//             {/* ================================= */}
//             {/* ATTENDANCE SUMMARY */}
//             {/* ================================= */}

//             <div>

//                 <h2>
//                     Attendance Summary
//                 </h2>


//                 {/* Employee Summary Selector */}

//                 <div
//                     style={{
//                         marginBottom: "20px"
//                     }}
//                 >

//                     <label>
//                         Select Employee
//                     </label>

//                     <br />

//                     <select
//                         value={
//                             selectedEmployee
//                         }
//                         onChange={
//                             handleEmployeeChange
//                         }
//                         style={{
//                             padding: "10px",
//                             marginTop: "5px",
//                             minWidth: "250px"
//                         }}
//                     >

//                         <option value="">
//                             All Employees
//                         </option>


//                         {
//                             employees.map(
//                                 (employee) => (

//                                     <option
//                                         key={
//                                             employee.id
//                                         }
//                                         value={
//                                             employee.id
//                                         }
//                                     >

//                                         {
//                                             employee.employee_code
//                                         }

//                                         {" - "}

//                                         {
//                                             employee.name
//                                         }

//                                     </option>

//                                 )
//                             )
//                         }

//                     </select>

//                 </div>


//                 {/* Summary Cards */}

//                 {
//                     summaryLoading ? (

//                         <p>
//                             Loading summary...
//                         </p>

//                     ) : summary ? (

//                         <div
//                             style={{
//                                 display: "grid",
//                                 gridTemplateColumns:
//                                     "repeat(4, 1fr)",
//                                 gap: "20px",
//                                 marginBottom: "30px"
//                             }}
//                         >

//                             {/* Total Days */}

//                             <div
//                                 style={{
//                                     background:
//                                         "white",
//                                     padding:
//                                         "25px",
//                                     borderRadius:
//                                         "12px",
//                                     boxShadow:
//                                         "0 4px 12px rgba(0,0,0,0.08)"
//                                 }}
//                             >

//                                 <p>
//                                     Total Days
//                                 </p>

//                                 <h2>
//                                     {
//                                         summary.total_days
//                                     }
//                                 </h2>

//                             </div>


//                             {/* Present */}

//                             <div
//                                 style={{
//                                     background:
//                                         "white",
//                                     padding:
//                                         "25px",
//                                     borderRadius:
//                                         "12px",
//                                     boxShadow:
//                                         "0 4px 12px rgba(0,0,0,0.08)"
//                                 }}
//                             >

//                                 <p>
//                                     Present Days
//                                 </p>

//                                 <h2
//                                     style={{
//                                         color:
//                                             "green"
//                                     }}
//                                 >
//                                     {
//                                         summary.present_days
//                                     }
//                                 </h2>

//                             </div>


//                             {/* Absent */}

//                             <div
//                                 style={{
//                                     background:
//                                         "white",
//                                     padding:
//                                         "25px",
//                                     borderRadius:
//                                         "12px",
//                                     boxShadow:
//                                         "0 4px 12px rgba(0,0,0,0.08)"
//                                 }}
//                             >

//                                 <p>
//                                     Absent Days
//                                 </p>

//                                 <h2
//                                     style={{
//                                         color:
//                                             "red"
//                                     }}
//                                 >
//                                     {
//                                         summary.absent_days
//                                     }
//                                 </h2>

//                             </div>


//                             {/* Percentage */}

//                             <div
//                                 style={{
//                                     background:
//                                         "white",
//                                     padding:
//                                         "25px",
//                                     borderRadius:
//                                         "12px",
//                                     boxShadow:
//                                         "0 4px 12px rgba(0,0,0,0.08)"
//                                 }}
//                             >

//                                 <p>
//                                     Attendance Percentage
//                                 </p>

//                                 <h2
//                                     style={{
//                                         color:
//                                             "#2563eb"
//                                     }}
//                                 >

//                                     {
//                                         summary.attendance_percentage
//                                     }%

//                                 </h2>

//                             </div>

//                         </div>

//                     ) : (

//                         <p>
//                             No attendance summary available.
//                         </p>

//                     )

//                 }

//             </div>


//             {/* ================================= */}
//             {/* MARK ATTENDANCE */}
//             {/* ================================= */}

//             <div
//                 style={{
//                     background: "white",
//                     padding: "25px",
//                     borderRadius: "12px",
//                     marginBottom: "30px"
//                 }}
//             >

//                 <h2>
//                     Mark Attendance
//                 </h2>


//                 <form
//                     onSubmit={
//                         handleSubmit
//                     }
//                 >

//                     {/* Employee */}

//                     <div>

//                         <label>
//                             Employee
//                         </label>

//                         <br />

//                         <select
//                             name="employee_id"
//                             value={
//                                 formData.employee_id
//                             }
//                             onChange={
//                                 handleChange
//                             }
//                             required
//                         >

//                             <option value="">
//                                 Select Employee
//                             </option>


//                             {
//                                 employees.map(
//                                     (employee) => (

//                                         <option
//                                             key={
//                                                 employee.id
//                                             }
//                                             value={
//                                                 employee.id
//                                             }
//                                         >

//                                             {
//                                                 employee.name
//                                             }

//                                         </option>

//                                     )
//                                 )
//                             }

//                         </select>

//                     </div>


//                     <br />


//                     {/* Date */}

//                     <div>

//                         <label>
//                             Attendance Date
//                         </label>

//                         <br />

//                         <input
//                             type="date"
//                             name="attendance_date"
//                             value={
//                                 formData.attendance_date
//                             }
//                             onChange={
//                                 handleChange
//                             }
//                             required
//                         />

//                     </div>


//                     <br />


//                     {/* Status */}

//                     <div>

//                         <label>
//                             Status
//                         </label>

//                         <br />

//                         <select
//                             name="status"
//                             value={
//                                 formData.status
//                             }
//                             onChange={
//                                 handleChange
//                             }
//                         >

//                             <option value="Present">
//                                 Present
//                             </option>

//                             <option value="Absent">
//                                 Absent
//                             </option>

//                         </select>

//                     </div>


//                     <br />


//                     {/* Check In */}

//                     <div>

//                         <label>
//                             Check In
//                         </label>

//                         <br />

//                         <input
//                             type="time"
//                             name="check_in_time"
//                             value={
//                                 formData.check_in_time
//                             }
//                             onChange={
//                                 handleChange
//                             }
//                         />

//                     </div>


//                     <br />


//                     {/* Check Out */}

//                     <div>

//                         <label>
//                             Check Out
//                         </label>

//                         <br />

//                         <input
//                             type="time"
//                             name="check_out_time"
//                             value={
//                                 formData.check_out_time
//                             }
//                             onChange={
//                                 handleChange
//                             }
//                         />

//                     </div>


//                     <br />


//                     <button
//                         type="submit"
//                     >
//                         Mark Attendance
//                     </button>


//                 </form>

//             </div>


//             {/* ================================= */}
//             {/* FILTERS */}
//             {/* ================================= */}

//             <div
//                 style={{
//                     background: "white",
//                     padding: "20px",
//                     borderRadius: "12px",
//                     marginBottom: "20px"
//                 }}
//             >

//                 <h2>
//                     Attendance Records
//                 </h2>


//                 {/* ================================= */}
//                 {/* SEARCH */}
//                 {/* ================================= */}

//                 <div
//                     style={{
//                         marginBottom: "15px"
//                     }}
//                 >

//                     <label>
//                         Search Employee
//                     </label>

//                     <br />

//                     <input
//                         type="text"
//                         placeholder="Search name, code or department"
//                         value={
//                             search
//                         }
//                         onChange={
//                             (e) =>
//                                 setSearch(
//                                     e.target.value
//                                 )
//                         }
//                         style={{
//                             padding: "10px",
//                             width: "300px"
//                         }}
//                     />

//                 </div>


//                 {/* ================================= */}
//                 {/* EMPLOYEE FILTER */}
//                 {/* ================================= */}

//                 <select
//                     value={
//                         filterEmployee
//                     }
//                     onChange={
//                         (e) =>
//                             setFilterEmployee(
//                                 e.target.value
//                             )
//                     }
//                     style={{
//                         padding: "10px",
//                         marginRight: "10px"
//                     }}
//                 >

//                     <option value="">
//                         All Employees
//                     </option>


//                     {
//                         employees.map(
//                             (employee) => (

//                                 <option
//                                     key={
//                                         employee.id
//                                     }
//                                     value={
//                                         employee.id
//                                     }
//                                 >

//                                     {
//                                         employee.employee_code
//                                     }

//                                     {" - "}

//                                     {
//                                         employee.name
//                                     }

//                                 </option>

//                             )
//                         )
//                     }

//                 </select>


//                 {/* ================================= */}
//                 {/* DATE FILTER */}
//                 {/* ================================= */}

//                 <input
//                     type="date"
//                     value={
//                         filterDate
//                     }
//                     onChange={
//                         (e) =>
//                             setFilterDate(
//                                 e.target.value
//                             )
//                     }
//                     style={{
//                         padding: "10px",
//                         marginRight: "10px"
//                     }}
//                 />


//                 {/* ================================= */}
//                 {/* STATUS FILTER */}
//                 {/* ================================= */}

//                 <select
//                     value={
//                         filterStatus
//                     }
//                     onChange={
//                         (e) =>
//                             setFilterStatus(
//                                 e.target.value
//                             )
//                     }
//                     style={{
//                         padding: "10px",
//                         marginRight: "10px"
//                     }}
//                 >

//                     <option value="">
//                         All Status
//                     </option>

//                     <option value="Present">
//                         Present
//                     </option>

//                     <option value="Absent">
//                         Absent
//                     </option>

//                 </select>


//                 {/* ================================= */}
//                 {/* CLEAR FILTERS */}
//                 {/* ================================= */}

//                 <button
//                     type="button"
//                     onClick={
//                         clearFilters
//                     }
//                     style={{
//                         padding: "10px 18px",
//                         background: "#ef4444",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "6px",
//                         cursor: "pointer"
//                     }}
//                 >

//                     Clear Filters

//                 </button>

//             </div>


//             {/* ================================= */}
//             {/* ERROR */}
//             {/* ================================= */}

//             {
//                 error && (

//                     <p
//                         style={{
//                             color: "red"
//                         }}
//                     >

//                         {error}

//                     </p>

//                 )
//             }


//             {/* ================================= */}
//             {/* TABLE */}
//             {/* ================================= */}

//             <div
//                 style={{
//                     background: "white",
//                     padding: "20px",
//                     borderRadius: "12px",
//                     overflowX: "auto"
//                 }}
//             >

//                 <table
//                     style={{
//                         width: "100%",
//                         borderCollapse:
//                             "collapse"
//                     }}
//                 >

//                     <thead>

//                         <tr>

//                             <th>
//                                 Employee
//                             </th>

//                             <th>
//                                 Department
//                             </th>

//                             <th>
//                                 Date
//                             </th>

//                             <th>
//                                 Check In
//                             </th>

//                             <th>
//                                 Check Out
//                             </th>

//                             <th>
//                                 Status
//                             </th>

//                             <th>
//                                 Action
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {
//                             attendance.length >
//                             0 ? (

//                                 attendance.map(

//                                     (record) => (

//                                         <tr
//                                             key={
//                                                 record.id
//                                             }
//                                         >

//                                             <td>
//                                                 {
//                                                     record.employee_name
//                                                 }
//                                             </td>

//                                             <td>
//                                                 {
//                                                     record.department
//                                                 }
//                                             </td>

//                                             <td>
//                                                 {
//                                                     record.attendance_date
//                                                 }
//                                             </td>

//                                             <td>
//                                                 {
//                                                     record.check_in_time ||
//                                                     "-"
//                                                 }
//                                             </td>

//                                             <td>
//                                                 {
//                                                     record.check_out_time ||
//                                                     "-"
//                                                 }
//                                             </td>

//                                             <td>

//                                                 <span
//                                                     style={{
//                                                         color:
//                                                             record.status ===
//                                                             "Present"
//                                                                 ? "green"
//                                                                 : "red",
//                                                         fontWeight:
//                                                             "bold"
//                                                     }}
//                                                 >

//                                                     {
//                                                         record.status
//                                                     }

//                                                 </span>

//                                             </td>

//                                             <td>

//                                                 <button
//                                                     onClick={
//                                                         () =>
//                                                             handleDelete(
//                                                                 record.id
//                                                             )
//                                                     }
//                                                 >

//                                                     Delete

//                                                 </button>

//                                             </td>

//                                         </tr>

//                                     )

//                                 )

//                             ) : (

//                                 <tr>

//                                     <td
//                                         colSpan="7"
//                                         style={{
//                                             textAlign:
//                                                 "center",
//                                             padding:
//                                                 "30px"
//                                         }}
//                                     >

//                                         No attendance records found.

//                                     </td>

//                                 </tr>

//                             )
//                         }

//                     </tbody>

//                 </table>

//             </div>


//         </div>

//     );

// }


// export default Attendance;


// import {
//     useEffect,
//     useMemo,
//     useState
// } from "react";

// import API from "../services/api.js";

// import Toast
//     from "../components/Toast.jsx";


// function Attendance() {


//     // =========================================
//     // EMPLOYEES
//     // =========================================

//     const [employees, setEmployees] =
//         useState([]);


//     // =========================================
//     // ATTENDANCE
//     // =========================================

//     const [attendance, setAttendance] =
//         useState([]);


//     // =========================================
//     // SUMMARY
//     // =========================================

//     const [summary, setSummary] =
//         useState({

//             total_records: 0,

//             present_count: 0,

//             absent_count: 0,

//             late_count: 0,

//             leave_count: 0

//         });


//     // =========================================
//     // LOADING
//     // =========================================

//     const [loading, setLoading] =
//         useState(true);


//     // =========================================
//     // SEARCH
//     // =========================================

//     const [search, setSearch] =
//         useState("");


//     // =========================================
//     // STATUS FILTER
//     // =========================================

//     const [statusFilter, setStatusFilter] =
//         useState("");


//     // =========================================
//     // MODAL
//     // =========================================

//     const [showForm, setShowForm] =
//         useState(false);


//     // =========================================
//     // EDIT MODE
//     // =========================================

//     const [editingAttendance, setEditingAttendance] =
//         useState(null);


//     // =========================================
//     // TOAST
//     // =========================================

//     const [toast, setToast] =
//         useState({

//             message: "",

//             type: "success"

//         });


//     // =========================================
//     // FORM DATA
//     // =========================================

//     const [formData, setFormData] =
//         useState({

//             employee_id: "",

//             attendance_date: "",

//             check_in_time: "",

//             check_out_time: "",

//             status: "Present"

//         });


//     // =========================================
//     // SHOW TOAST
//     // =========================================

//     const showToast = (

//         message,

//         type = "success"

//     ) => {

//         setToast({

//             message,

//             type

//         });

//     };


//     // =========================================
//     // FETCH EMPLOYEES
//     // =========================================

//     const fetchEmployees = async () => {

//         try {

//             const response =
//                 await API.get(
//                     "/employees"
//                 );


//             setEmployees(

//                 response.data.data || []

//             );


//         } catch (error) {

//             console.error(

//                 "Employee Error:",

//                 error

//             );


//             showToast(

//                 "Failed to load employees",

//                 "error"

//             );

//         }

//     };


//     // =========================================
//     // FETCH ATTENDANCE
//     // =========================================

//     const fetchAttendance = async () => {

//         try {

//             const response =
//                 await API.get(
//                     "/attendance"
//                 );


//             setAttendance(

//                 response.data.data || []

//             );


//         } catch (error) {

//             console.error(

//                 "Attendance Error:",

//                 error

//             );


//             showToast(

//                 "Failed to load attendance records",

//                 "error"

//             );

//         }

//     };


//     // =========================================
//     // FETCH SUMMARY
//     // =========================================

//     const fetchSummary = async () => {

//         try {

//             const response =
//                 await API.get(
//                     "/attendance/summary"
//                 );


//             setSummary(

//                 response.data.data || {}

//             );


//         } catch (error) {

//             console.error(

//                 "Summary Error:",

//                 error

//             );

//         }

//     };


//     // =========================================
//     // INITIAL LOAD
//     // =========================================

//     useEffect(() => {

//         const loadData = async () => {

//             setLoading(true);


//             await Promise.all([

//                 fetchEmployees(),

//                 fetchAttendance(),

//                 fetchSummary()

//             ]);


//             setLoading(false);

//         };


//         loadData();

//     }, []);


//     // =========================================
//     // FORM CHANGE
//     // =========================================

//     const handleChange = (event) => {

//         const {
//             name,
//             value
//         } = event.target;


//         setFormData({

//             ...formData,

//             [name]: value

//         });

//     };


//     // =========================================
//     // OPEN ADD FORM
//     // =========================================

//     const handleAdd = () => {

//         setEditingAttendance(null);


//         const today = new Date()

//             .toISOString()

//             .split("T")[0];


//         setFormData({

//             employee_id: "",

//             attendance_date: today,

//             check_in_time: "",

//             check_out_time: "",

//             status: "Present"

//         });


//         setShowForm(true);

//     };


//     // =========================================
//     // OPEN EDIT FORM
//     // =========================================

//     const handleEdit = (record) => {

//         setEditingAttendance(record);


//         setFormData({

//             employee_id:
//                 record.employee_id || "",

//             attendance_date:
//                 record.attendance_date || "",

//             check_in_time:
//                 record.check_in_time || "",

//             check_out_time:
//                 record.check_out_time || "",

//             status:
//                 record.status || "Present"

//         });


//         setShowForm(true);

//     };


//     // =========================================
//     // SUBMIT
//     // =========================================

//     const handleSubmit = async (event) => {

//         event.preventDefault();


//         if (!formData.employee_id) {

//             showToast(

//                 "Please select an employee",

//                 "error"

//             );

//             return;

//         }


//         try {


//             if (editingAttendance) {


//                 await API.put(

//                     `/attendance/${editingAttendance.id}`,

//                     {

//                         attendance_date:
//                             formData.attendance_date,

//                         check_in_time:
//                             formData.check_in_time ||
//                             null,

//                         check_out_time:
//                             formData.check_out_time ||
//                             null,

//                         status:
//                             formData.status

//                     }

//                 );


//                 showToast(

//                     "Attendance updated successfully",

//                     "success"

//                 );


//             } else {


//                 await API.post(

//                     "/attendance",

//                     {

//                         employee_id:
//                             Number(
//                                 formData.employee_id
//                             ),

//                         attendance_date:
//                             formData.attendance_date,

//                         check_in_time:
//                             formData.check_in_time ||
//                             null,

//                         check_out_time:
//                             formData.check_out_time ||
//                             null,

//                         status:
//                             formData.status

//                     }

//                 );


//                 showToast(

//                     "Attendance marked successfully",

//                     "success"

//                 );

//             }


//             setShowForm(false);

//             setEditingAttendance(null);


//             await fetchAttendance();

//             await fetchSummary();


//         } catch (error) {

//             console.error(

//                 "Attendance Save Error:",

//                 error

//             );


//             showToast(

//                 error.response?.data?.message ||

//                 "Failed to save attendance",

//                 "error"

//             );

//         }

//     };


//     // =========================================
//     // DELETE
//     // =========================================

//     const handleDelete = async (id) => {


//         const confirmed =
//             window.confirm(

//                 "Are you sure you want to delete this attendance record?"

//             );


//         if (!confirmed) {

//             return;

//         }


//         try {


//             await API.delete(

//                 `/attendance/${id}`

//             );


//             showToast(

//                 "Attendance deleted successfully",

//                 "success"

//             );


//             await fetchAttendance();

//             await fetchSummary();


//         } catch (error) {


//             console.error(

//                 "Delete Error:",

//                 error

//             );


//             showToast(

//                 error.response?.data?.message ||

//                 "Failed to delete attendance",

//                 "error"

//             );

//         }

//     };


//     // =========================================
//     // FILTER ATTENDANCE
//     // =========================================

//     const filteredAttendance =

//         useMemo(() => {


//             return attendance.filter(

//                 (record) => {


//                     const searchText =

//                         search

//                             .toLowerCase()

//                             .trim();


//                     const matchesSearch =

//                         !searchText ||

//                         record.name

//                             ?.toLowerCase()

//                             .includes(
//                                 searchText
//                             ) ||

//                         record.employee_code

//                             ?.toLowerCase()

//                             .includes(
//                                 searchText
//                             );


//                     const matchesStatus =

//                         !statusFilter ||

//                         record.status ===
//                         statusFilter;


//                     return (

//                         matchesSearch &&

//                         matchesStatus

//                     );

//                 }

//             );


//         }, [

//             attendance,

//             search,

//             statusFilter

//         ]);


//     // =========================================
//     // LOADING
//     // =========================================

//     if (loading) {

//         return (

//             <div className="page-content">

//                 <div className="loading-state">

//                     <div className="loading-spinner">
//                     </div>

//                     <p>
//                         Loading attendance...
//                     </p>

//                 </div>

//             </div>

//         );

//     }


//     // =========================================
//     // UI
//     // =========================================

//     return (

//         <div className="page-content">


//             {/* =====================================
//                 HEADER
//             ====================================== */}

//             <div className="page-header">

//                 <div>

//                     <h1>
//                         Attendance
//                     </h1>

//                     <p>
//                         Track and manage employee
//                         attendance records.
//                     </p>

//                 </div>


//                 <button

//                     className="btn btn-primary add-employee-btn"

//                     onClick={handleAdd}

//                 >

//                     + Mark Attendance

//                 </button>

//             </div>


//             {/* =====================================
//                 SUMMARY CARDS
//             ====================================== */}

//             <div className="attendance-summary-grid">


//                 <div className="attendance-summary-card">

//                     <div className="summary-icon">
//                         📊
//                     </div>

//                     <div>

//                         <span>
//                             Total Records
//                         </span>

//                         <strong>
//                             {summary.total_records || 0}
//                         </strong>

//                     </div>

//                 </div>


//                 <div className="attendance-summary-card">

//                     <div className="summary-icon">
//                         ✅
//                     </div>

//                     <div>

//                         <span>
//                             Present
//                         </span>

//                         <strong>
//                             {summary.present_count || 0}
//                         </strong>

//                     </div>

//                 </div>


//                 <div className="attendance-summary-card">

//                     <div className="summary-icon">
//                         ❌
//                     </div>

//                     <div>

//                         <span>
//                             Absent
//                         </span>

//                         <strong>
//                             {summary.absent_count || 0}
//                         </strong>

//                     </div>

//                 </div>


//                 <div className="attendance-summary-card">

//                     <div className="summary-icon">
//                         ⏰
//                     </div>

//                     <div>

//                         <span>
//                             Late
//                         </span>

//                         <strong>
//                             {summary.late_count || 0}
//                         </strong>

//                     </div>

//                 </div>


//                 <div className="attendance-summary-card">

//                     <div className="summary-icon">
//                         🏖️
//                     </div>

//                     <div>

//                         <span>
//                             Leave
//                         </span>

//                         <strong>
//                             {summary.leave_count || 0}
//                         </strong>

//                     </div>

//                 </div>


//             </div>


//             {/* =====================================
//                 FILTER BAR
//             ====================================== */}

//             <div className="employee-filter-bar">


//                 <div className="employee-search">

//                     <span>
//                         🔍
//                     </span>

//                     <input

//                         type="text"

//                         placeholder="Search employee..."

//                         value={search}

//                         onChange={(e) =>
//                             setSearch(
//                                 e.target.value
//                             )
//                         }

//                     />

//                 </div>


//                 <select

//                     value={statusFilter}

//                     onChange={(e) =>
//                         setStatusFilter(
//                             e.target.value
//                         )
//                     }

//                 >

//                     <option value="">
//                         All Status
//                     </option>

//                     <option value="Present">
//                         Present
//                     </option>

//                     <option value="Absent">
//                         Absent
//                     </option>

//                     <option value="Late">
//                         Late
//                     </option>

//                     <option value="Leave">
//                         Leave
//                     </option>

//                 </select>


//                 <button

//                     className="btn btn-secondary"

//                     onClick={() => {

//                         setSearch("");

//                         setStatusFilter("");

//                     }}

//                 >

//                     Clear

//                 </button>


//             </div>


//             {/* =====================================
//                 TABLE
//             ====================================== */}

//             <div className="table-container">


//                 <table className="data-table">


//                     <thead>

//                         <tr>

//                             <th>
//                                 Employee
//                             </th>

//                             <th>
//                                 Date
//                             </th>

//                             <th>
//                                 Check-In
//                             </th>

//                             <th>
//                                 Check-Out
//                             </th>

//                             <th>
//                                 Status
//                             </th>

//                             <th>
//                                 Actions
//                             </th>

//                         </tr>

//                     </thead>


//                     <tbody>


//                         {filteredAttendance.length > 0 ? (

//                             filteredAttendance.map(

//                                 (record) => (

//                                     <tr
//                                         key={
//                                             record.id
//                                         }
//                                     >


//                                         {/* EMPLOYEE */}

//                                         <td>

//                                             <div className="employee-name-cell">


//                                                 <div className="employee-avatar">

//                                                     {record.name

//                                                         ?.charAt(0)

//                                                         ?.toUpperCase() ||

//                                                         "?"

//                                                     }

//                                                 </div>


//                                                 <div>

//                                                     <strong>

//                                                         {
//                                                             record.name ||
//                                                             "-"
//                                                         }

//                                                     </strong>


//                                                     <small>

//                                                         {
//                                                             record.employee_code ||
//                                                             "-"
//                                                         }

//                                                     </small>

//                                                 </div>


//                                             </div>

//                                         </td>


//                                         {/* DATE */}

//                                         <td>

//                                             {
//                                                 record.attendance_date ||
//                                                 "-"
//                                             }

//                                         </td>


//                                         {/* CHECK IN */}

//                                         <td>

//                                             {
//                                                 record.check_in_time ||
//                                                 "-"
//                                             }

//                                         </td>


//                                         {/* CHECK OUT */}

//                                         <td>

//                                             {
//                                                 record.check_out_time ||
//                                                 "-"
//                                             }

//                                         </td>


//                                         {/* STATUS */}

//                                         <td>

//                                             <span

//                                                 className={

//                                                     `status-badge ${
//                                                         String(
//                                                             record.status
//                                                         ).toLowerCase()
//                                                         ===
//                                                         "present"

//                                                             ? "status-active"

//                                                             : "status-inactive"
//                                                     }`

//                                                 }

//                                             >

//                                                 {
//                                                     record.status ||
//                                                     "Present"
//                                                 }

//                                             </span>

//                                         </td>


//                                         {/* ACTIONS */}

//                                         <td>

//                                             <div className="action-buttons">


//                                                 <button

//                                                     type="button"

//                                                     className="btn btn-primary"

//                                                     onClick={() =>
//                                                         handleEdit(
//                                                             record
//                                                         )
//                                                     }

//                                                 >

//                                                     Edit

//                                                 </button>


//                                                 <button

//                                                     type="button"

//                                                     className="btn btn-danger"

//                                                     onClick={() =>
//                                                         handleDelete(
//                                                             record.id
//                                                         )
//                                                     }

//                                                 >

//                                                     Delete

//                                                 </button>


//                                             </div>

//                                         </td>


//                                     </tr>

//                                 )

//                             )

//                         ) : (

//                             <tr>

//                                 <td

//                                     colSpan="6"

//                                     className="empty-state"

//                                 >

//                                     <div>

//                                         <div className="empty-icon">
//                                             📅
//                                         </div>

//                                         <h3>
//                                             No Attendance Records
//                                         </h3>

//                                         <p>
//                                             Mark attendance
//                                             to see records here.
//                                         </p>

//                                     </div>

//                                 </td>

//                             </tr>

//                         )}


//                     </tbody>


//                 </table>


//             </div>


//             {/* =====================================
//                 ATTENDANCE MODAL
//             ====================================== */}

//             {showForm && (

//                 <div className="modal-overlay">


//                     <div className="employee-modal">


//                         {/* HEADER */}

//                         <div className="modal-header">

//                             <div>

//                                 <h2>

//                                     {editingAttendance

//                                         ? "Edit Attendance"

//                                         : "Mark Attendance"

//                                     }

//                                 </h2>


//                                 <p>

//                                     {editingAttendance

//                                         ? "Update attendance record"

//                                         : "Create a new attendance record"

//                                     }

//                                 </p>

//                             </div>


//                             <button

//                                 type="button"

//                                 className="modal-close"

//                                 onClick={() => {

//                                     setShowForm(false);

//                                     setEditingAttendance(null);

//                                 }}

//                             >

//                                 ×

//                             </button>

//                         </div>


//                         {/* FORM */}

//                         <form

//                             className="employee-form"

//                             onSubmit={
//                                 handleSubmit
//                             }

//                         >


//                             <div className="employee-form-grid">


//                                 {/* EMPLOYEE */}

//                                 <div className="form-group">

//                                     <label>
//                                         Employee
//                                     </label>

//                                     <select

//                                         name="employee_id"

//                                         value={
//                                             formData.employee_id
//                                         }

//                                         onChange={
//                                             handleChange
//                                         }

//                                         disabled={
//                                             Boolean(
//                                                 editingAttendance
//                                             )
//                                         }

//                                         required

//                                     >

//                                         <option value="">

//                                             Select Employee

//                                         </option>


//                                         {employees.map(

//                                             (employee) => (

//                                                 <option

//                                                     key={
//                                                         employee.id
//                                                     }

//                                                     value={
//                                                         employee.id
//                                                     }

//                                                 >

//                                                     {
//                                                         employee.name
//                                                     }

//                                                     {" - "}

//                                                     {
//                                                         employee.employee_code
//                                                     }

//                                                 </option>

//                                             )

//                                         )}

//                                     </select>

//                                 </div>


//                                 {/* DATE */}

//                                 <div className="form-group">

//                                     <label>
//                                         Attendance Date
//                                     </label>

//                                     <input

//                                         type="date"

//                                         name="attendance_date"

//                                         value={
//                                             formData.attendance_date
//                                         }

//                                         onChange={
//                                             handleChange
//                                         }

//                                         required

//                                     />

//                                 </div>


//                                 {/* CHECK IN */}

//                                 <div className="form-group">

//                                     <label>
//                                         Check-In Time
//                                     </label>

//                                     <input

//                                         type="time"

//                                         name="check_in_time"

//                                         value={
//                                             formData.check_in_time
//                                         }

//                                         onChange={
//                                             handleChange
//                                         }

//                                     />

//                                 </div>


//                                 {/* CHECK OUT */}

//                                 <div className="form-group">

//                                     <label>
//                                         Check-Out Time
//                                     </label>

//                                     <input

//                                         type="time"

//                                         name="check_out_time"

//                                         value={
//                                             formData.check_out_time
//                                         }

//                                         onChange={
//                                             handleChange
//                                         }

//                                     />

//                                 </div>


//                                 {/* STATUS */}

//                                 <div className="form-group">

//                                     <label>
//                                         Attendance Status
//                                     </label>

//                                     <select

//                                         name="status"

//                                         value={
//                                             formData.status
//                                         }

//                                         onChange={
//                                             handleChange
//                                         }

//                                         required

//                                     >

//                                         <option value="Present">
//                                             Present
//                                         </option>

//                                         <option value="Absent">
//                                             Absent
//                                         </option>

//                                         <option value="Late">
//                                             Late
//                                         </option>

//                                         <option value="Leave">
//                                             Leave
//                                         </option>

//                                     </select>

//                                 </div>


//                             </div>


//                             {/* ACTIONS */}

//                             <div className="modal-actions">


//                                 <button

//                                     type="button"

//                                     className="btn btn-secondary"

//                                     onClick={() => {

//                                         setShowForm(false);

//                                         setEditingAttendance(null);

//                                     }}

//                                 >

//                                     Cancel

//                                 </button>


//                                 <button

//                                     type="submit"

//                                     className="btn btn-primary"

//                                 >

//                                     {editingAttendance

//                                         ? "Update Attendance"

//                                         : "Mark Attendance"

//                                     }

//                                 </button>


//                             </div>


//                         </form>


//                     </div>


//                 </div>

//             )}


//             {/* =====================================
//                 TOAST
//             ====================================== */}

//             <Toast

//                 message={
//                     toast.message
//                 }

//                 type={
//                     toast.type
//                 }

//                 onClose={() =>
//                     setToast({

//                         message: "",

//                         type: "success"

//                     })
//                 }

//             />


//         </div>

//     );

// }


// export default Attendance;


import {
    useEffect,
    useMemo,
    useState
} from "react";

import API from "../services/api.js";

import Toast
    from "../components/Toast.jsx";


function Attendance() {


    // =========================================
    // EMPLOYEES
    // =========================================

    const [employees, setEmployees] =
        useState([]);


    // =========================================
    // ATTENDANCE
    // =========================================

    const [attendance, setAttendance] =
        useState([]);


    // =========================================
    // SUMMARY
    // =========================================

    const [summary, setSummary] =
        useState({

            total_records: 0,

            present_count: 0,

            absent_count: 0,

            late_count: 0,

            leave_count: 0

        });


    // =========================================
    // LOADING
    // =========================================

    const [loading, setLoading] =
        useState(true);


    // =========================================
    // SEARCH
    // =========================================

    const [search, setSearch] =
        useState("");


    // =========================================
    // STATUS FILTER
    // =========================================

    const [statusFilter, setStatusFilter] =
        useState("");


    // =========================================
    // MODAL
    // =========================================

    const [showForm, setShowForm] =
        useState(false);


    // =========================================
    // EDIT MODE
    // =========================================

    const [editingAttendance, setEditingAttendance] =
        useState(null);


    // =========================================
    // TOAST
    // =========================================

    const [toast, setToast] =
        useState({

            message: "",

            type: "success"

        });


    // =========================================
    // FORM DATA
    // =========================================

    const [formData, setFormData] =
        useState({

            employee_id: "",

            attendance_date: "",

            check_in_time: "",

            check_out_time: "",

            attendance_status: "Present"

        });


    // =========================================
    // SHOW TOAST
    // =========================================

    const showToast = (

        message,

        type = "success"

    ) => {

        setToast({

            message,

            type

        });

    };


    // =========================================
    // FETCH EMPLOYEES
    // =========================================

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


    // =========================================
    // FETCH ATTENDANCE
    // =========================================

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


    // =========================================
    // FETCH SUMMARY
    // =========================================

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


    // =========================================
    // INITIAL LOAD
    // =========================================

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


    // =========================================
    // FORM CHANGE
    // =========================================

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


    // =========================================
    // OPEN ADD FORM
    // =========================================

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


    // =========================================
    // OPEN EDIT FORM
    // =========================================

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


    // =========================================
    // SUBMIT
    // =========================================

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


        // Date validation
        if (!formData.attendance_date) {

            showToast(

                "Please select attendance date",

                "error"

            );

            return;

        }


        try {


            // =====================================
            // UPDATE ATTENDANCE
            // =====================================

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


            // =====================================
            // CREATE ATTENDANCE
            // =====================================

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


            // =====================================
            // CLOSE FORM
            // =====================================

            setShowForm(false);

            setEditingAttendance(null);


            // =====================================
            // REFRESH DATA
            // =====================================

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


    // =========================================
    // DELETE
    // =========================================

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


    // =========================================
    // FILTER ATTENDANCE
    // =========================================

    const filteredAttendance =

        useMemo(() => {


            return attendance.filter(

                (record) => {


                    const searchText =

                        search

                            .toLowerCase()

                            .trim();


                    // =================================
                    // SEARCH MATCH
                    // =================================

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


                    // =================================
                    // STATUS MATCH
                    // =================================

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


    // =========================================
    // LOADING
    // =========================================

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


    // =========================================
    // UI
    // =========================================

    return (

        <div className="page-content">


            {/* =====================================
                HEADER
            ====================================== */}

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


            {/* =====================================
                SUMMARY CARDS
            ====================================== */}

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


            {/* =====================================
                FILTER BAR
            ====================================== */}

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


            {/* =====================================
                TABLE
            ====================================== */}

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


                                        {/* =================================
                                            EMPLOYEE
                                        ================================== */}

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


                                        {/* =================================
                                            DATE
                                        ================================== */}

                                        <td>

                                            {
                                                record.attendance_date ||
                                                "-"
                                            }

                                        </td>


                                        {/* =================================
                                            CHECK IN
                                        ================================== */}

                                        <td>

                                            {
                                                record.check_in_time ||
                                                "-"
                                            }

                                        </td>


                                        {/* =================================
                                            CHECK OUT
                                        ================================== */}

                                        <td>

                                            {
                                                record.check_out_time ||
                                                "-"
                                            }

                                        </td>


                                        {/* =================================
                                            ATTENDANCE STATUS
                                        ================================== */}

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


                                        {/* =================================
                                            ACTIONS
                                        ================================== */}

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


            {/* =====================================
                ATTENDANCE MODAL
            ====================================== */}

            {showForm && (

                <div className="modal-overlay">


                    <div className="employee-modal">


                        {/* =================================
                            MODAL HEADER
                        ================================== */}

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


                        {/* =================================
                            FORM
                        ================================== */}

                        <form

                            className="employee-form"

                            onSubmit={
                                handleSubmit
                            }

                        >


                            <div className="employee-form-grid">


                                {/* =================================
                                    EMPLOYEE
                                ================================== */}

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


                                {/* =================================
                                    ATTENDANCE DATE
                                ================================== */}

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


                                {/* =================================
                                    CHECK IN
                                ================================== */}

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


                                {/* =================================
                                    CHECK OUT
                                ================================== */}

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


                                {/* =================================
                                    ATTENDANCE STATUS
                                ================================== */}

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


                            {/* =================================
                                MODAL ACTIONS
                            ================================== */}

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


            {/* =====================================
                TOAST
            ====================================== */}

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