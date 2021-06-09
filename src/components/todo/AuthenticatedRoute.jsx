import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import AuthenticationService from './AuthenticationService';

function AuthenticatedRoute(props) {
    if (AuthenticationService.userLoggedIn()) {
        return (
            <Route {...props} />
        );
    }
    else {
        return (
            <Redirect to="/login" />
        );
    }
}

export default AuthenticatedRoute;
