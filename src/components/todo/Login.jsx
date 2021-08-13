import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthenticationService from './AuthenticationService';

const UNINIT_LOGIN = 0;
const SUCCESS_LOGIN = 1;
const FAIL_LOGIN = 2;

function Login() {

    const [username, setUsername] = useState('username');
    const [password, setPassword] = useState('password');
    const [loginState, setLoginState] = useState(UNINIT_LOGIN);
    const history = useHistory();
    return (
        <div>
            <div>
                Username
                <input type="text" name="username" value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>

            <div>
                Password
                <input type="text" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <LoginButton className="btn btn-success" username={username} password={password} setloginstate={setLoginState} history={history} />
            {loginState === SUCCESS_LOGIN && <div> LOGIN SUCCESS</div>}
            {loginState === FAIL_LOGIN && <div className="alert alert-warning"> LOGIN FAIL</div>}
        </div>
    );
}

function LoginButton(props) {
    return (
        <div>
            <button onClick={() => loginClick(props.username, props.password, props.setloginstate, props.history)}> Login </button>
        </div>
    );
}

function loginClick(username, password, setloginstate, history) {

    /*
    AuthenticationService.verifyAuthentication(username, password).then(
        () => {
            AuthenticationService.registerSuccessfulLogin(username, password);
            console.log("Authentication success");
            setloginstate(SUCCESS_LOGIN);
            history.push(`/welcome/${username}`);
        }
    ).catch(
        () => {
            console.log("Failed");
            setloginstate(FAIL_LOGIN);
        }
    );
    */

    AuthenticationService.verifyJWTAuthentication(username, password).then(
        (response) => {
            AuthenticationService.registerSuccessfulJWTLogin(username, response.data.token);
            console.log("Authentication success");
            setloginstate(SUCCESS_LOGIN);
            history.push(`/welcome/${username}`);
        }
    ).catch(
        () => {
            console.log("Failed");
            setloginstate(FAIL_LOGIN);
        }
    );
}

export default Login;
