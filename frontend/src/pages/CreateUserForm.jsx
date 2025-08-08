import { useState } from "react";
import api from "../utils/axios";
const roles = ["principal", "hod", "tutor", "staff"];

export default function CreateUserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "staff",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      api
        .post("/admin/create-user", formData)
        .then((res) => {
          alert("User created successfully");
          onSubmit && onSubmit(res.data);
        })
        .catch((err) => {
          console.error("Error creating user:", err);
          alert("Failed to create user. Please try again.");
        });
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
    setFormData({
      full_name: "",
      email: "",
      password: "",
      role: "staff",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-md shadow-md"
    >
      <h2 className="text-lg font-bold mb-4">Create User</h2>

      <input
        name="name"
        placeholder="Name"
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
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        {roles.map((role) => (
          <option key={role} value={role}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create User
      </button>
    </form>
  );
}
