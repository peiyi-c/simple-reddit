import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, []);
  return (
    <h1 style={{ textAlign: "center", marginTop: "5rem" }}>Page not found</h1>
  );
};
