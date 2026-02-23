export default function EmployeeCard({ employee, onClick }) {
  return (
    <div className="col-md-4 mb-4">
      <div
        className="card shadow-sm h-100"
        onClick={() => onClick(employee)}
        style={{ cursor: "pointer" }}
      >
        <img
          src={employee.image_url || "https://via.placeholder.com/300"}
          className="card-img-top"
          alt={employee.name}
        />
        <div className="card-body">
          <h5 className="card-title">{employee.name}</h5>
          <p className="card-text">{employee.designation}</p>
          <small>ID: {employee.employee_id}</small>
        </div>
      </div>
    </div>
  );
}
