import { useState } from "react";
import useEmployeeStore from "../store/useEmployeeStore";
import useAuthStore from "../store/useAuthStore";

export default function EmployeeDetailPanel() {

  const {selectedEmployee,deleteEmployee, updateEmployee,selectEmployee } = useEmployeeStore();

  const { user } = useAuthStore();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!selectedEmployee) return null;



  const handleChange = (field, value) => {
    selectEmployee({
      ...selectedEmployee,
      [field]: value
    });
  };


  // handling update
  const handleSave = async () => {
    try {
      setLoading(true);
      setSuccess("");
      setError("");

      await updateEmployee(selectedEmployee.id, {
        address: selectedEmployee.address,
        phone: selectedEmployee.phone
      });

      setSuccess("Updated successfully ");

     

    } catch (err) {
      setError("Update failed ");

   
    } finally {
      setLoading(false);
    }
  };



  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?."
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      setSuccess("");
      setError("");

      await deleteEmployee(selectedEmployee.id);

      setSuccess("Employee deleted successfully ");

    } catch (err) {
      setError("Delete failed ");

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="col-md-4 border-start p-3">

      <img
        src={selectedEmployee.image_url}
        className="img-fluid mb-3"
        alt={selectedEmployee.name}
      />

      <h4>{selectedEmployee.name}</h4>
      <p>{selectedEmployee.designation}</p>
      <p>Email: {selectedEmployee.email}</p>


      {success && (
        <div className="alert alert-success py-1">
          {success}
        </div>
      )}


      {error && (
        <div className="alert alert-danger py-1">
          {error}
        </div>
      )}



      {user?.role === "employee" && (
        <>
          <label>Address</label>
          <input
            className="form-control mb-2"
            value={selectedEmployee.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
          />

          <label>Phone</label>
          <input
            className="form-control mb-2"
            value={selectedEmployee.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <button
            className="btn btn-success"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </>
      )}




      {user?.role === "admin" && (
        <button
          className="btn btn-danger mt-3"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete Employee"}
        </button>
      )}

    </div>
  );
}