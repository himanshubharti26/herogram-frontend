import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Login} from "./pages/login/Login.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { Dashboard } from "./pages/dashboard/Dashboard.tsx";
import { Upload } from "./pages/upload/Upload.tsx";
import { Signup } from "./pages/signup/Signup.tsx";

const AppRouter: React.FC = () => {
  return (
    <Router>
    
        <Routes>
           
            {/* <Route element={<ProtectedRoute/>}> */}
                <Route path ="dashboard" element={<Dashboard/>}/>
                <Route path = "upload" element = {<Upload/>}/>
                
            {/* </Route> */}
            <Route path="signup" element={<Signup/>}/>
            <Route path="/" element ={<Login/>}/>
        </Routes>
    </Router>
  );
};

export default AppRouter;
