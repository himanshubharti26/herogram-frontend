import React from "react";
import { useState } from "react";
import axios from "axios";

export const Signup = () => {

    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const handleRegister = async()=>{
        try{
            const baseUrl = "http://localhost:7000";

        const user = await axios.post(`${baseUrl}/user`, {name, email, password});
        console.log("user registered successfully", user);
        }catch(err){
            console.log(err);
        }
        
    }

return(
    <div  className="login-container">
            <div className="login-box">
                <h1 id="login-heading">Sign Up</h1>
                <input type="text"  className="input" placeholder="Enter Name ..." onChange={(e)=>setName(e.target.value)}/>
                <input type="email"  className="input" placeholder="Enter email ..." onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" className="input" placeholder="Enter password ... " onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn" onClick={handleRegister}>Register</button> 
            </div>
        </div>
    )
} 