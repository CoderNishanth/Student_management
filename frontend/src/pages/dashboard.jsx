import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AdminDashboard from "./dashboard/AdminDashboard";
import { useAuthContext } from "../Context/AppContext";
import PrincipalDashboard from "./dashboard/PrincipalDashboard";
import HODDashboard from "./dashboard/HODDashboard";
// import TutorDashboard from "./dashboard/TutorDashboard";
import StaffDashboard from "./dashboard/StaffDashboard";

export default function Dashboard() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  
  if (!user) return null;

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "principal":
      return <PrincipalDashboard />;
    case "hod":
      return <HODDashboard />;
    // case "tutor":
    //   return <TutorDashboard />;
    case "staff":
      return <StaffDashboard />;
    default:
      return <div className="p-4">Unauthorized</div>;
  }
}
