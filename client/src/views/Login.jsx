import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {toast} from "react-toastify"; // Import the Link component

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://backend.soho.conf/api/users/login', {
                email, password,
            }).then(({ data }) => {
                if (data != null && data.accessToken) {
                    localStorage.setItem('token', data.accessToken);
                    navigate('/products');
                } else {
                    toast.error("Can't Authenticated!", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            });
        } catch (error) {
            console.error("Error during login:", error);
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <Link to="/register" className="link-btn">Don't have an account? Register here.</Link> {/* Use Link component here */}
        </div>
    )
}
