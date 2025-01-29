// import React, { createContext, useState, useContext } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);


//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user'); // Clear from localStorage
//   };



//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


