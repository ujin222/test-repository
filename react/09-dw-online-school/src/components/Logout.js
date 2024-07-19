import React from "react";
import { Navigate } from "react-router-dom";

function Logout(props) {
  // const navigate = useNavigate();
  localStorage.removeItem("member");
  // navigate('/');
  return <Navigate to="/" />;
}

export default Logout;
