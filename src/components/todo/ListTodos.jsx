import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TodoService from '../../api/todo/TodoService.js';
import moment from 'moment';
import AuthenticationService from './AuthenticationService.js'

function ListTodos() {
    const [todos, setTodos] = useState([]);
    const [numTodos, setNumTodos] = useState(0);
    const history = useHistory();

    useEffect(() => {
        let username = AuthenticationService.getUsername();
        TodoService.retrieveAllTodos(username).then(
            response => {
                setTodos(response.data);
                setNumTodos(todos.length)
            }
        );
    }, [numTodos])
    return (
        <div>
            <h1>Todos</h1>

            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is completed?</th>
                            <th>Target Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment.utc(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td> <button className="btn btn-success" onClick={() => history.push(`/todos/${todo.id}`)}> Update </button> </td>
                                        <td> <button className="btn btn-warning" onClick={() => { deleteTodo(todo.id); setNumTodos(numTodos - 1) }}> Delete </button> </td>
                                    </tr>
                            )
                        }

                    </tbody>
                </table>
                <div className="row">
                    <button className = "btn btn-success" onClick={() => history.push(`/todos/-1`)}> Add </button>
                </div>
            </div>
        </div>
    );
}

function updateTodo(props, id) {

    console.log("update clicked" + id);
}

function deleteTodo(id) {
    let name = AuthenticationService.getUsername();
    TodoService.deleteTodo(name, id);
}
export default ListTodos;