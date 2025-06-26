// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";

// const TokenExpirationChecker = ({ children }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedToken = jwt_decode(token);
//         const currentTime = Date.now() / 1000;

//         if (decodedToken.exp < currentTime) {
//           localStorage.removeItem("token");
//           navigate("/login");  
//         }
//       } catch (error) {
//         console.error("Error decoding token", error);
//         localStorage.removeItem("token");
//         navigate("/login");
//       }
//     }
//   }, [navigate]);

//   return <>{children}</>;
// };

// export default TokenExpirationChecker;
