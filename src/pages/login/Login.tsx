import React, { useState } from "react";
import "./login.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
 export const Login = ()=>{

    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>();

    const handleLogin = async()=>{
        try{
        const baseUrl = "http://localhost:7000";
        const token:string = await axios.post(`${baseUrl}/auth/login`, {email, password});

        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        navigate("/dashboard");
        }catch(err){
            console.log("error in login");
        }
    }
    return (
        <div  className="login-container">
            <div className="login-box">
                <h1 id="login-heading">Login</h1>
                <input type="email"  className="input" placeholder="Enter email ..." onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" className="input" placeholder="Enter password ... " onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn" onClick={handleLogin}>Login</button> 
            </div>
            <button className="btn reg" onClick={()=>{navigate("/signup")}}>Sign up</button>
        </div>
    );
}