import React, { createContext, useState, useEffect } from "react";


export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [ selectedUserData, setSelectedUserData ] = useState(null);


  // Load user from localStorage (Persisting session)
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  // // Function to store user data
  // const saveUser = (userData) => {
  //   setUserData(userData);
  //   localStorage.setItem("userData", JSON.stringify(userData)); // Persist user session
  // };
    
   const selectedUser = (userData) =>
   {
      setSelectedUserData(userData)

   }


    const login = (userData) => {
    setUserData(userData);
    localStorage.setItem('userData', JSON.stringify(userData)); // Save to localStorage (optional)
  };
  
  // Function to logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove session
  };

  return (
    <UserContext.Provider value={{ userData, login, logout ,selectedUserData,selectedUser   }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;