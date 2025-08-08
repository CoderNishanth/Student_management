import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import CreateUserForm from "./pages/CreateUserForm";
import CreateStudentForm from "./pages/CreateStudent";
import StudentDetails from "./pages/StudentPages/StudentDetails";
import { useAuthContext } from "./Context/AppContext";
import StudentEdit from "./pages/StudentPages/StudentEdit";

export default function App() {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      if(user.role === "admin"){" "}
      {
        <>
          <Route path="/admin/create-user" element={<CreateUserForm />} />
          <Route path="/admin/create-student" element={<CreateStudentForm />} />
          <Route path="/admin/edit-student/:id" element={<StudentEdit />} />
        </>
      }
      <Route path="/studentdetails/:id" element={<StudentDetails />} />
    </Routes>
  );
}
