import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const newSocket = io(import.meta.env.VITE_BASE_URL);
      newSocket.emit("register", userData._id);
      setSocket(newSocket);

      return () => newSocket.disconnect(); 
    }
  }, [userData]);

  const selectedUser = (userData) => {
    setSelectedUserData(userData);
  };

  const login = (userData) => {
    setUserData(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem("userData");
    if (socket) socket.disconnect();
    setSocket(null);
  };

  return (
    <UserContext.Provider value={{ userData, login, logout, selectedUserData, selectedUser, socket }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
