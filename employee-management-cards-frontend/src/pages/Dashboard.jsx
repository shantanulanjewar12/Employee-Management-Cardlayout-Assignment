import { useEffect } from "react";
import Navbar from "../components/Navbar";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeDetailPanel from "../components/EmployeeDetailPanel";
import useEmployeeStore from "../store/useEmployeeStore";
import useAuthStore from "../store/useAuthStore";

export default function Dashboard() {
  const { fetchEmployees, employees, selectEmployee, selectedEmployee } =    useEmployeeStore();

  const user = useAuthStore((state) => state.user);

  // fetching the employees when user exists
  useEffect(() => {
    if (user) {
      fetchEmployees();
    }
  }, [user, fetchEmployees]);


  if (!user) return null;

  const filteredEmployees =
    user.role === "admin"
      ? employees
      : employees.filter((e) => e.id == user.id);


      
 
  useEffect(() => {
    if (
      filteredEmployees.length > 0 &&
      !selectedEmployee
    ) {
      selectEmployee(filteredEmployees[0]);
    }
  }, [filteredEmployees, selectedEmployee, selectEmployee]);


  
  return (
    <>
      <Navbar />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {filteredEmployees.map((emp) => (
                <EmployeeCard
                  key={emp.id}
                  employee={emp}
                  onClick={selectEmployee}
                />
              ))}
            </div>
          </div>

          <div className="col-md-4">
            <EmployeeDetailPanel />
          </div>
        </div>
      </div>
    </>
  );
}