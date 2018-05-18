import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Shell    from './layout/Shell.jsx';
import TodoForm from './forms/TodoForm.jsx';

export default class AddTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cancel: false
        };

        this.onCancel = this.onCancel.bind(this);
    }

    render() {
        if(this.state.cancel) {
            return <Redirect to="/" />
        }

        return (
            <Shell>
                <TodoForm onCancel={this.onCancel} />
            </Shell>
        );
    }

    onCancel(e) {
        this.setState({ cancel: true });
    }
}
