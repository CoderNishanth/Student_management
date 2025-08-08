import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/axios";
import StudentsList from "../StudentPages/StudentList";

export default function AdminDashboard() {
  const [studentlist,setStudentlist] = useState({});
  useEffect(()=>{
    const getstudents = async () => {
      const {data} = await api.get("/admin/students");
      setStudentlist(data);
    }
    getstudents();
  },[]);
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/admin/create-user"
          className="bg-blue-100 p-4 rounded shadow hover:bg-blue-200"
        >
          ➕ Create User
        </Link>
        <Link
          to="/admin/create-student"
          className="bg-green-100 p-4 rounded shadow hover:bg-green-200"
        >
          🎓 Add Student
        </Link>
      </div>
      <div>
        {studentlist.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Students List</h2>
            {studentlist.map((student) => (
                <StudentsList key={student.id} student={student} />
            ))}
          </>
        ) : (
          <h2 className="text-xl font-semibold mb-4">No Students Found</h2>
        )}
      </div>
    </div>
  );
}
