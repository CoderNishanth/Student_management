import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/axios";

export default function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    api.get(`/students/${id}`).then((res) => setStudent(res.data));
  }, [id]);

  if (!student) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{student.name}</h1>
      <p>ID: {student.id}</p>
      <p>Department: {student.department}</p>
      <p>Phone: {student.phone}</p>
      <p>Email: {student.email}</p>
      <p>Year: {student.year}</p>
      <p>Section: {student.section}</p>
      <p>Roll No: {student.roll_no}</p>
      <p>DOB: {new Date(student.dob).toLocaleDateString()}</p>
      <img
        src={`data:image/png;base64,${student.qr_code}`}
        alt="QR Code"
        className="mt-4"
      />
    </div>
  );
}
