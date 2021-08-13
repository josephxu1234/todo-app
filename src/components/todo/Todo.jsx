import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoService from '../../api/todo/TodoService.js';
import AuthenticationService from './AuthenticationService';


function Todo(props) {
    let id = props.match.params.id;
    let name = AuthenticationService.getUsername();

    const [desc, setDesc] = useState('');
    const [date, setDate] = useState(moment.utc(new Date()).format('YYYY-MM-DD'));
    const history = useHistory();

    useEffect(() => {
        if (id === -1) {
            return;
        }
        TodoService.retrieveTodo(name, id).then(
            response => {
                setDesc(response.data.description);
                setDate(moment.utc(response.data.targetDate).format('YYYY-MM-DD'));
                console.log("set");
            }
        )
    })

    function submit(values) {
        let name = AuthenticationService.getUsername();
        console.log(values.date);
        let todo = {
            id: values.id,
            description: values.desc,
            targetDate: values.date
        }
        if (id === -1) {

            TodoService.createTodo(name, todo).then(

                () => {
                    history.push(`/todos`)
                }
            )
        }
        else {
            let name = AuthenticationService.getUsername();
            TodoService.updateTodo(name, values.id, todo).then(

                () => {
                    history.push(`/todos`)
                }
            )
        }
    }
    return (
        <div>
            <h1> Todo </h1>
            <div className="container">
                <Formik initialValues={{ desc, date, id }} onSubmit={submit} validate={validate} validateOnChange={false} validateOnBlur={false} enableReinitialize={true}>
                    {
                        (props) =>
                            (
                                <Form>
                                    <ErrorMessage name="desc" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="date" component="div" className="alert alert-warning" />

                                    <fieldset className="form-group">
                                        <label> Description</label>
                                        <Field className="form-control" type="text" name="desc" />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label> Target Date</label>
                                        <Field className="form-control" type="date" name="date" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit"> Save </button>
                                </Form>
                            )
                    }
                </Formik>
            </div>
        </div>
    );
}



function validate(values) {
    let errors = {};
    if (!values.desc) {
        errors.desc = 'Enter a description'
    }

    if (!moment(values.date).isValid()) {
        errors.date = "Enter a valid target date"
    }
    return errors;
}

export default Todo;
