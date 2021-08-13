import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import AuthenticationService from './AuthenticationService';

function Header() {
    const isUserLoggedIn = AuthenticationService.userLoggedIn();
    console.log(isUserLoggedIn);
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div><h1 className="navbar-brand">josephxu1234</h1></div>
                <ul className="navbar-nav">
                    {isUserLoggedIn && <li key = "welcome"> <Link to="/welcome/josephxu1234" className="nav-link">Home</Link></li>}
                    {isUserLoggedIn && <li key = "todos"> <Link to="/todos" className="nav-link">Todos</Link></li>}
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    {!isUserLoggedIn && <li key = "login"> <Link to="/login" className="nav-link">Login </Link></li>}
                    {isUserLoggedIn && <li key = "logout"> <Link to="/logout" className="nav-link" onClick={AuthenticationService.logout}>Logout </Link></li>}
                </ul>
            </nav>
        </header>
    );
}

export default withRouter(Header);