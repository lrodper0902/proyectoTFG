// import React, { useState, useEffect, createContext, useContext } from 'react';
// import {jwtDecode} from 'jwt-decode';  

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState(() => {
//         const user = localStorage.getItem("user");
//         return user ? JSON.parse(user) : {};
//     });

//     useEffect(() => {
//         authUser();
//     }, []);

//     const isTokenExpired = (token) => {
//         try {
//             const decoded = jwtDecode(token);
//             const currentTime = Date.now() / 1000;
//             return decoded.exp < currentTime;
//         } catch (error) {
//             console.error("Error decoding token:", error);
//             return true;
//         }
//     };

//     const authUser = () => {
//         const token = localStorage.getItem("token");
//         const user = localStorage.getItem("user");

//         if (!token || !user || isTokenExpired(token)) {
//             console.log("Token expirado o no existe");
//             logout();
//         } else {
//             try {
//                 setAuth(JSON.parse(user));
//             } catch (error) {
//                 console.error("Error parsing user JSON:", error);
//                 logout();
//             }
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setAuth({});
//     };

//     return (
//         <AuthContext.Provider value={{ auth, setAuth, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);

// export default AuthContext;
