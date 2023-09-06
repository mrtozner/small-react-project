import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const passwordIsValid = (pass) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
        return regex.test(pass);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            alert("Passwords do not match!");
            return;
        }

        if (!passwordIsValid(password)) {
            alert("Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 5 characters long.");
            return;
        }

        try {
            await axios.post('http://backend.soho.conf/api/users/register', {
                name, email, password, password2, username
            }).then(({ data }) => {
                if (data.user != null) {
                    toast.success("Successfully Registered!", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    navigate('/login');
                }
            });
        } catch (error) {
            console.error("Error during registration:", error);
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" required />

                <label htmlFor="username">Username</label>
                <input value={username} name="username" onChange={(e) => setUsername(e.target.value)} id="username" placeholder="Username" required />

                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" required />

                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" required />

                <label htmlFor="password2">Confirm Password</label>
                <input value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" placeholder="********" id="password2" name="password2" required />

                <button type="submit">Register</button>
            </form>
            <Link to="/login" className="link-btn">Already have an account? Login here.</Link>
        </div>
    );
}
