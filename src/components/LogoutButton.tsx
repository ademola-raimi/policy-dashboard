import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogoutButton: React.FC = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("http://localhost:3001/logout", {}, { withCredentials: true });
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="text-sm text-gray-600 hover:underline">
      Logout
    </button>
  );
};

export default LogoutButton;