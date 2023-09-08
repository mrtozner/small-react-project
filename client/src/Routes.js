import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Login } from './views/Login';
import { Register } from './views/Register';
import { Products } from './views/Products';
import { ProtectedRoute } from './ProtectedRoute';

function RedirectToLogin() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/login");
    }, [navigate]);

    return null;
}

const RoutesComponent = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProtectedRoute component={Products} />} />
            <Route path="*" element={<RedirectToLogin />} />
        </Routes>
    </BrowserRouter>
);

export default RoutesComponent;
