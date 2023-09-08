import React, { useEffect, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [isVerified, setVerified] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.get(`http://backend.soho.conf/api/users/authorized`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.status === 200 && response.data === 'Authorized') {
                    setVerified(true);
                } else {
                    navigate("/login");
                }
            } catch (error) {
                navigate("/login");
            }
        }

        if (token) {
            verifyToken();
        } else {
            navigate("/login");
        }
    }, [token, navigate]);

    return (
        <Route
            {...rest}
            render={props =>
                isVerified ? <Component {...props} /> : null
            }
        />
    );
};
