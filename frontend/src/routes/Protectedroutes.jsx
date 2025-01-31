import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

function Protectedroutes({ children }) {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [storedUser, setStoredUser] = useState(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("userData");
    if (userFromStorage) {
      setStoredUser(JSON.parse(userFromStorage));
    }
    setLoading(false);
  }, []);

  if (loading) return null; 

  return userData || storedUser ? children : <Navigate to="/signin" />;
}

export default Protectedroutes;
