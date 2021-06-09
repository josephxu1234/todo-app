import React from 'react';
import {Link} from 'react-router-dom';

function Welcome(props) {
    return (
        <div>
            <h1> Welcome! </h1>
            <div className="container">
                Welcome {props.match.params.name}! You can manage your todos <Link to='/todos'> here </Link>
            </div>
        </div>
    );
}

export default Welcome;