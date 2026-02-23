import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import useAuthStore from "./store/useAuthStore";

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={
          user ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />


      <Route
        path="/dashboard"
        element={
          user ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />



      <Route
        path="*"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;