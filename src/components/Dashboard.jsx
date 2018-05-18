import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

import TodoStore    from '../store/TodoStore';
import TodoActions  from '../actions/TodoActions';

import Shell    from './layout/Shell.jsx';
import TodoList from './partials/TodoList.jsx';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: null
        };

        this.todosChanged   = this.todosChanged.bind(this);
    }

    componentDidMount() {
        TodoStore.on('change', this.todosChanged);
        TodoActions.list();
    }

    componentWillUnmount() {
        TodoStore.removeListener('change', this.todosChanged);
    }

    render() {
        return (
            <Shell>
                <span style={{float: 'right' }}>
                    <Link to="/add-todo">
                        <Button color="blue">
                            <Icon name="add circle" /> Add Todo
                        </Button>
                    </Link>
                </span>
                <h2>This is what I am trying to do with my life</h2>
                {this.state.todos ?
                    <TodoList todos={this.state.todos} />
                    : ''
                }
            </Shell>
        );
    }

    todosChanged() {
        this.setState({
            todos: TodoStore.items
        });
    }
}
