import React from "react";
import { useNavigate, useParams } from "react-router";

export const RouterComponent: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ userId?: string }>(); // Example param

  const handleNavigate = () => {
    navigate("/some-other-page");
  };

  return (
    <div>
      <h1>Router Component</h1>
      <p>User ID from URL: {params.userId || "Not provided"}</p>
      <button onClick={handleNavigate}>Navigate Away</button>
    </div>
  );
};
