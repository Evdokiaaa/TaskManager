import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useState } from "react";

function App() {
  const [user] = useState({
    id: 1,
    name: "ivan",
    roles: ["ADMIN"],
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/signup" element={<h1>Signup</h1>} />

        {/*ADMIN ROUTES*/}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.roles.includes("ADMIN")}
            />
          }
        >
          <Route path="dashboard" element={<h1>Admin Dashboard</h1>} />
          <Route path="tasks" element={<h1>Admin Tasks</h1>} />
          <Route path="create-task" element={<h1>Admin create task</h1>} />
          <Route path="users" element={<h1>Admin all usersk</h1>} />
        </Route>

        {/*USER ROUTES */}
        <Route
          path="user"
          element={
            <ProtectedRoute isAllowed={!!user && user.roles.includes("USER")} />
          }
        >
          <Route path="dashboard" element={<h1>User Dashboard</h1>} />
          <Route path="tasks" element={<h1>User Tasks</h1>} />
          <Route path="task-details/:id" element={<h1>User create task</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
