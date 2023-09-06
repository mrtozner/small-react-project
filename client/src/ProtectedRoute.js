import React from 'react';
import {Link, Route} from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => {

    const isAuthenticated = localStorage.getItem('token');

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Link to="/login" />
                )
            }
        />
    );
};
