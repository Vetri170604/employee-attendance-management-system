import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import API from "../services/api.js";

import Toast from "../components/Toast.jsx";


function EditEmployee() {

    const {
        id
    } = useParams();


    const navigate =
        useNavigate();


    const [loading, setLoading] =
        useState(true);


    const [saving, setSaving] =
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


    useEffect(() => {

        fetchEmployee();

    }, [id]);


    const fetchEmployee =
        async () => {

            try {

                const response =
                    await API.get(
                        `/employees/${id}`
                    );

                setFormData(
                    response.data.data
                );

            } catch (error) {

                console.error(error);

                setToast({

                    message:
                        "Failed to load employee",

                    type:
                        "error"

                });

            } finally {

                setLoading(false);

            }

        };


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

                setSaving(true);

                await API.put(
                    `/employees/${id}`,
                    formData
                );

                setToast({

                    message:
                        "Employee updated successfully",

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
                        "Failed to update employee",

                    type:
                        "error"

                });

            } finally {

                setSaving(false);

            }

        };


    if (loading) {

        return (

            <div className="loading-state">

                <div className="spinner"></div>

                <p>
                    Loading employee...
                </p>

            </div>

        );

    }


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
                        Edit Employee
                    </h1>

                    <p>
                        Update employee information
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
                                Employee Code
                            </label>

                            <input
                                name="employee_code"
                                value={
                                    formData.employee_code ||
                                    ""
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                name="name"
                                value={
                                    formData.name ||
                                    ""
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={
                                    formData.email ||
                                    ""
                                }
                                onChange={
                                    handleChange
                                }
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
                                    formData.phone ||
                                    ""
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Department
                            </label>

                            <input
                                name="department"
                                value={
                                    formData.department ||
                                    ""
                                }
                                onChange={
                                    handleChange
                                }
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
                                    formData.designation ||
                                    ""
                                }
                                onChange={
                                    handleChange
                                }
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
                                    formData.joining_date ||
                                    ""
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
                                    formData.status ||
                                    "Active"
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
                            disabled={saving}
                        >

                            {
                                saving
                                    ? "Updating..."
                                    : "Update Employee"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}


export default EditEmployee;