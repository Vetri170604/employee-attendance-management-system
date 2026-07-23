function EmployeeForm({

    formData,

    handleChange,

    handleSubmit,

    onCancel,

    editing,

    saving = false

}) {

    return (

        <div className="modal-overlay">
            <div className="employee-modal">
                <div className="modal-header">

                    <div>

                        <span className="modal-eyebrow">
                            Employee Management
                        </span>

                        <h2>

                            {editing

                                ? "Edit Employee"

                                : "Add New Employee"

                            }

                        </h2>

                        <p>

                            {editing

                                ? "Update employee information and details."

                                : "Create a new employee profile."

                            }

                        </p>

                    </div>


                    <button

                        type="button"

                        className="modal-close"

                        onClick={onCancel}

                        disabled={saving}

                    >

                        ×

                    </button>

                </div>
                <form

                    onSubmit={handleSubmit}

                    className="employee-form"

                >


                    <div className="employee-form-grid">


                        {/* Employee Code */}

                        <div className="form-group">

                            <label>
                                Employee Code
                            </label>

                            <input

                                type="text"

                                name="employee_code"

                                value={
                                    formData.employee_code ||
                                    ""
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="EMP001"

                                required

                            />

                        </div>


                        {/* Full Name */}

                        <div className="form-group">

                            <label>
                                Full Name
                            </label>

                            <input

                                type="text"

                                name="name"

                                value={
                                    formData.name ||
                                    ""
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="Enter employee name"

                                required

                            />

                        </div>


                        {/* Email */}

                        <div className="form-group">

                            <label>
                                Email Address
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

                                placeholder="employee@example.com"

                                required

                            />

                        </div>


                        {/* Phone Number */}

                        <div className="form-group">

                            <label>
                                Phone Number
                            </label>

                            <input

                                type="tel"

                                name="phone"

                                value={
                                    formData.phone ||
                                    ""
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="+91 9876543210"

                            />

                        </div>


                        {/* Department */}

                        <div className="form-group">

                            <label>
                                Department
                            </label>

                            <input

                                type="text"

                                name="department"

                                value={
                                    formData.department ||
                                    ""
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="IT / HR / Finance"

                                required

                            />

                        </div>


                        {/* Position */}

                        <div className="form-group">

                            <label>
                                Position
                            </label>

                            <input

                                type="text"

                                name="position"

                                value={
                                    formData.position ||
                                    ""
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="Software Developer"

                            />

                        </div>


                        {/* Status */}

                        <div className="form-group">

                            <label>
                                Employment Status
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
                    <div className="modal-actions">


                        <button

                            type="button"

                            className="btn btn-secondary"

                            onClick={onCancel}

                            disabled={saving}

                        >

                            Cancel

                        </button>


                        <button

                            type="submit"

                            className="btn btn-primary"

                            disabled={saving}

                        >

                            {saving

                                ? "Saving..."

                                : editing

                                    ? "Update Employee"

                                    : "Add Employee"

                            }

                        </button>


                    </div>


                </form>

            </div>

        </div>

    );

}


export default EmployeeForm;