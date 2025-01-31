import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);

  // Load user from localStorage (Persist session)
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  // Function to store selected chat user
  const selectedUser = (userData) => {
    setSelectedUserData(userData);
  };

  // Function to log in user and store data in localStorage
  const login = (userData) => {
    setUserData(userData);
    localStorage.setItem("userData", JSON.stringify(userData)); // Persist user session
  };

  // Function to log out user and clear session
  const logout = () => {
    setUserData(null); // Corrected from setUser(null)
    localStorage.removeItem("userData"); // Corrected from "user"
  };

  return (
    <UserContext.Provider value={{ userData, login, logout, selectedUserData, selectedUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
