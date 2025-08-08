import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/students/${studentId}`
        );
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };
    
    if (studentId) {
      fetchStudentDetails();
    }
  }, [studentId]);

  return (
    <div>
      <h1>Student Management System</h1>
      <div>
        {student ? (
          <div>
            <h1>Student Details</h1>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Phone:</strong> {student.phone}</p>
            <p><strong>Date of Birth:</strong> {student.dob}</p>
            <p><strong>Department:</strong> {student.department}</p>
            <p><strong>Year:</strong> {student.year}</p>
            <p><strong>Section:</strong> {student.section}</p>
            <p><strong>Roll No:</strong> {student.roll_no}</p>
            <img
              src={`data:image/png;base64,${student.qr_code}`}
              alt="QR Code"
            />
          </div>
        ) : (
          <p>Loading student details...</p>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
