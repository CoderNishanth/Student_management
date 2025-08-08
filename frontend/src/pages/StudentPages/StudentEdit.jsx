import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import api from "@/utils/axios";
import { useAuthContext } from "../../Context/AppContext";

export default function EditStudentForm() {
  const { id } = useParams(); 
  const {navigate} = useAuthContext();
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

  useEffect(() => {
    // fetch current student data
    api.get(`/students/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error("Failed to fetch student:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/admin/edit/${id}`, formData);
      console.log("✅ Update success:", res.data);
      navigate(`/studentdetails/${id}`); 
      alert("Student updated successfully!");
    } catch (error) {
      console.error("❌ Update error:", error?.response?.data || error.message);
      alert("Failed to update student.");
    }
  };

   return (
    <div className="flex justify-center mt-10 px-4">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader>
          <CardTitle>Edit Student</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "text" },
              { label: "Date of Birth", name: "dob", type: "date" },
              { label: "Department", name: "department", type: "text" },
              { label: "Year", name: "year", type: "number" },
              { label: "Section", name: "section", type: "text" },
              { label: "Roll Number", name: "roll_no", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name} className="space-y-2">
                <Label htmlFor={name}>{label}</Label>
                <Input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <Button type="submit" className="w-full">
              Update Student
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};