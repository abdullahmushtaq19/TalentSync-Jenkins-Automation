import { sign } from 'jsonwebtoken';
import React, {useState} from 'react';

function Signup(){

    const [email,setEmail]=useState('');
    const {password,setPassword}=useState('');
    const {username,setUsername}=useState('');
    const {message,setMessage}=useState('');


    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('Error registering user');
        }
    };
    return(
        <div>
            <label>Enter username</label>
            <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)}></input>
            <label>Enter emial</label>
            <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <label>Enter passowrd</label>
            <input type='text' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <button onClick={handleSubmit}>Signup</button>
            <p>{message}</p>
        </div>
    )






};
export default Signup;