import React, { Component } from 'react';

import { Button, Container, Icon, List } from 'semantic-ui-react';

import Todo from './Todo.jsx';
import TodoForm from '../forms/TodoForm.jsx';

export default class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addingTodo: false
        };
    }

    render() {
        if(!this.props.todos) {
            return (
                <em>Loading...</em>
            );
        }


        if(!this.props.todos.length) {
            return (
                <div>
                    <em>Nothing todo found</em>
                    {this.bottomForm()}
                </div>
            );
        }

        return (
            <div>
                <List divided relaxed>
                    {this.props.todos.map(todo => {
                        return (
                            <Todo key={todo.id} todo={todo} person={this.props.person} />
                        );
                    })}
                </List>
                {this.bottomForm()}
            </div>
        );
    }

    bottomForm() {
        let canAdd      = this.props.allowAdd,
            addingTodo  = this.state.addingTodo
        ;

        return (
            <div style={{ marginTop: '1em' }}>
                {canAdd ?
                    (addingTodo ?
                        <TodoForm person={this.props.person}
                            onClose={() => { this.setState({ addingTodo: false }); }}
                        />
                        :
                        <Button color="green" size="mini"
                            onClick={ () => { this.setState({ addingTodo: true }); }}>
                            <Icon name="add circle" /> Add Something To Do
                        </Button>
                    )
                    : ''
                }
            </div>
        ); 
    }
}
