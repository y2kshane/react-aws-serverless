import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import decode from 'jwt-decode';

//ref
//https://medium.com/@melih193/react-with-react-router-5-9bdc9d427bfd

const isAuthenticated = ()=>{
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        decode(token);
        decode(refreshToken);
        console.log([decode(token),decode(refreshToken)])
        return true;
    } catch (error) {
        return false;
    }
}

const PrivateRoute=({ component: Component, ...rest })=> {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                        }}
                    />
                )
            }
        />
    );
}



export default PrivateRoute;