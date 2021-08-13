import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';
import Login from './Login.jsx';
import ListTodos from './ListTodos.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Logout from './Logout.jsx';
import Error from './Error.jsx';
import Welcome from './Welcome.jsx';
import Todo from './Todo.jsx';

function TodoApp() {
    return (
        <div>
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/login" exact component={Login} />
                    <AuthenticatedRoute path="/welcome/:name" exact component={Welcome} />
                    <AuthenticatedRoute path="/todos/:id" exact component={Todo} />
                    <AuthenticatedRoute path="/todos" exact component={ListTodos} />
                    <AuthenticatedRoute path="/logout" exact component={Logout} />
                    <Route component={Error} />
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}


export default TodoApp;