import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./components/screens/LoginScreen";
import HomeScreen from "./components/screens/HomeScreen";
import SignupScreen from "./components/screens/SignupScreen";
import CartScreen from "./components/screens/CartScreen";
// import TokenExpirationChecker from "./components/TokenExpirationChecker";
import Header from "./components/Header";
import ProductListScreen from "./components/screens/ProductListScreen";
import ProductDetailScreen from "./components/screens/ProductDetailScreen";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Wishlist from "./components/Wishlist";
import BlankScreen from "./components/screens/BlankScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import Interview from "./components/screens/Interview";




const App = () => {
  const token = localStorage.getItem('token');
  console.log("token",token)
  return (
    <>
      <Router>
        {/* <TokenExpirationChecker/> */}
        {token && <Header/>}
        <Routes>
          {/* <Route path="/" element={<BlankScreen/>}></Route> */}
          <Route path="/" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>}/>
          <Route path="/product" element={<ProtectedRoute><ProductListScreen /></ProtectedRoute>}/>
          <Route path="/product/:id" element={<ProtectedRoute><ProductDetailScreen /></ProtectedRoute>}/>
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>}/>
          <Route path="/cart" element={<ProtectedRoute><CartScreen /></ProtectedRoute>}/>

          <Route path="/interview" element={<Interview/>} />
          <Route exact path="/login" element={<LoginScreen />}></Route>
          <Route exact path="/signup" element={<SignupScreen />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
