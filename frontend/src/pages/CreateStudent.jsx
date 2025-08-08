import { useState } from "react";
import api from "../utils/axios";

export default function CreateStudentForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    department: "",
    year: "",
    section: "",
    roll_no: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
        api.post("/admin/create-student", formData)
            .then((res) => {
            alert("Student created successfully");
            onSubmit && onSubmit(res.data);
            })
            .catch((err) => {
            console.error("Error creating student:", err);
            alert("Failed to create student. Please try again.");
            });
    }
    catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Create Student</h2>

      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="dob"
        type="date"
        value={formData.dob}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="year"
        type="number"
        placeholder="Year (e.g. 1, 2, 3, 4)"
        value={formData.year}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="section"
        placeholder="Section"
        value={formData.section}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="roll_no"
        placeholder="Roll Number"
        value={formData.roll_no}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Create Student
      </button>
    </form>
  );
}
