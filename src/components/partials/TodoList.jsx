import React, { Component } from 'react';

import { List } from 'semantic-ui-react';

import Todo from './Todo.jsx';

export default class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        if(!this.props.todos.length) {
            return (
                <em>Loading...</em>
            );
        }

        return (
            <List divided relaxed>
                {this.props.todos.map(todo => {
                    return (
                        <Todo key={todo.id} todo={todo} />
                    );
                })}
            </List>
        );
    }
}
