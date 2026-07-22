import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import API from "../services/api.js";

import Toast from "../components/Toast.jsx";


function AddEmployee() {

    const navigate =
        useNavigate();


    const [loading, setLoading] =
        useState(false);


    const [toast, setToast] =
        useState({
            message: "",
            type: "success"
        });


    const [formData, setFormData] =
        useState({

            employee_code: "",

            name: "",

            email: "",

            phone: "",

            department: "",

            designation: "",

            joining_date: "",

            status: "Active"

        });


    const handleChange =
        (e) => {

            const {
                name,
                value
            } = e.target;

            setFormData({

                ...formData,

                [name]: value

            });

        };


    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                await API.post(
                    "/employees",
                    formData
                );

                setToast({

                    message:
                        "Employee added successfully",

                    type:
                        "success"

                });

                setTimeout(() => {

                    navigate(
                        "/employees"
                    );

                }, 1000);

            } catch (error) {

                console.error(error);

                setToast({

                    message:
                        error.response
                            ?.data
                            ?.message ||
                        "Failed to add employee",

                    type:
                        "error"

                });

            } finally {

                setLoading(false);

            }

        };


    return (

        <div className="page-container">


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


            <div className="page-header">

                <div>

                    <h1>
                        Add Employee
                    </h1>

                    <p>
                        Create a new employee profile
                    </p>

                </div>

            </div>


            <div className="form-card">

                <form
                    onSubmit={
                        handleSubmit
                    }
                >


                    <div className="form-grid">


                        <div className="form-group">

                            <label>
                                Employee Code *
                            </label>

                            <input
                                name="employee_code"
                                value={
                                    formData.employee_code
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="EMP001"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Full Name *
                            </label>

                            <input
                                name="name"
                                value={
                                    formData.name
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter full name"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Email *
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="employee@example.com"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Phone
                            </label>

                            <input
                                name="phone"
                                value={
                                    formData.phone
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter phone number"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Department *
                            </label>

                            <input
                                name="department"
                                value={
                                    formData.department
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="IT / HR / Development"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Designation
                            </label>

                            <input
                                name="designation"
                                value={
                                    formData.designation
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Software Engineer"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Joining Date
                            </label>

                            <input
                                type="date"
                                name="joining_date"
                                value={
                                    formData.joining_date
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Status
                            </label>

                            <select
                                name="status"
                                value={
                                    formData.status
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option value="Active">
                                    Active
                                </option>

                                <option value="Inactive">
                                    Inactive
                                </option>

                            </select>

                        </div>


                    </div>


                    <div className="form-actions">

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={() =>
                                navigate(
                                    "/employees"
                                )
                            }
                        >

                            Cancel

                        </button>


                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={loading}
                        >

                            {
                                loading
                                    ? "Saving..."
                                    : "Add Employee"
                            }

                        </button>

                    </div>


                </form>

            </div>

        </div>

    );

}


export default AddEmployee;