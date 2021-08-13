import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService.js';

function Welcome(props) {

    const [message, setMessage] = useState('');
    let name = props.match.params.name;
    return (
        <div>
            <h1> Welcome! </h1>
            <div className="container">
                Welcome {name}! You can manage your todos <Link to='/todos'> here </Link>
            </div>
            {/*<div className="container">
                Click here for a custom welcome message <button className = "btn btn-success" onClick = {() => retrieveWelcome(setMessage, name)}> Click here! </button>
    </div>*/}

            <div>
                {message}
            </div>
        </div>
    );
}

function retrieveWelcome(setMessage, name) {
    HelloWorldService.executeHelloWorldPathVariableService(name)
    .then((response) => setMessage(response.data.message))
    .catch();
}

export default Welcome;