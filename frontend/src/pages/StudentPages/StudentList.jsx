import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const StudentList = ({ student }) => {
  const nav = useNavigate();

  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition-shadow duration-200 bg-white">
      <div>
        <h2 className="text-xl font-semibold">{student.name}</h2>
        <p>ID: {student.id}</p>
        <p>Department: {student.department}</p>
        <p>Phone: {student.phone}</p>
        <p>Email: {student.email}</p>
        <p>Year: {student.year}</p>
        <p>Section: {student.section}</p>
        <p>Roll No: {student.roll_no}</p>
        <p>Date of Birth: {new Date(student.dob).toLocaleDateString()}</p>
      </div>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={() => nav(`/studentdetails/${student.id}`)}>
          View Details
        </Button>
        <Button onClick={() => nav(`/admin/edit-student/${student.id}`)}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default StudentList;
