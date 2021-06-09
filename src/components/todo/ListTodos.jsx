import React, { useState } from 'react';

function ListTodos() {
    const [todos, setTodos] = useState(
        [
            { id: 1, description: 'learn react', done: false, targetDate: new Date() },
            { id: 2, description: 'fuck javascript', done: false, targetDate: new Date() }
        ]
    )
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
                        </tr>
                    </thead>

                    <tbody>
                        {
                            todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                    </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListTodos;