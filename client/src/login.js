import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                setMessage('Login successful');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('Error logging in');
        }
    };
     

    // const navigate = useNavigate();
    //  const handleClick=()=>{
    //     navigate('/signup');
    // }

    return (
        <form onSubmit={handleSubmit}>
            {/* <button onClick={handleClick}>Signup</button> */}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Login;
