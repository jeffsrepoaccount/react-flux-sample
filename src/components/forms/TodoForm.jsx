import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'

import TodoActions from '../../actions/TodoActions';

export default class TodoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoTitle: ''
        };

        this.todoChange = this.todoChange.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
    }

    componentDidMount() {
        if(this.props.todo && this.props.todo.id) {
            this.setState({ todoTitle: this.props.todo.title });            
        }
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Form>
                <Form.Field>
                    <label>TODO:</label>
                    <input placeholder="What do you want to do?"
                        ref={(el) => { el && el.focus(); }}
                        value={this.state.todoTitle}
                        onChange={this.todoChange}
                    />
                </Form.Field>
                <Button type='submit' onClick={this.saveTodo}>Save</Button>
                <Button type='submit' onClick={this.props.onCancel}>Cancel</Button>
            </Form>
        );
    }

    todoChange(e) {
        this.setState({ todoTitle: e.target.value });
    }

    saveTodo(e) {
        let data = {
            title:  this.state.todoTitle
        };

        if(this.props.todo && this.props.todo.id) {
            data.id = this.props.todo.id;
            TodoActions.update(this.props.todo.id, data);
            return this.props.onCancel(e);
        }

        TodoActions.create(data);
        return this.props.onCancel(e);
    }
}
