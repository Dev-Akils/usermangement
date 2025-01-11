import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import UserTable from "./pages/Usermanagement/UserTable";
import AddUserForm from "./pages/Usermanagement/AddUserForm";
import Login from "./pages/LoginPage/Login";
import NotFound from "./pages/NotFound/NotFound";
import UpdateUserForm from "./pages/Usermanagement/UpdateUserForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/user-table"
          element={
            <ProtectedRoute>
              <UserTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-user"
          element={
            <ProtectedRoute>
              <AddUserForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-user/:id"
          element={
            <ProtectedRoute>
              <UpdateUserForm />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
