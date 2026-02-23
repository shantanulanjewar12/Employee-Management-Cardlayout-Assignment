import useAuthStore from "../store/useAuthStore";
import useEmployeeStore from "../store/useEmployeeStore";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const employees = useEmployeeStore((state) => state.employees);

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <div className="d-flex align-items-center">
        <div
          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
          style={{ width: "40px", height: "40px" }}
        >
          EMP
        </div>
        <span className="navbar-brand">Employee Management</span>
      </div>

      <div className="text-white">
        {user?.role === "admin" && (
          <span className="me-3">
            Total Employees: {employees?.length || 0}
          </span>
        )}

        <button className="btn btn-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}