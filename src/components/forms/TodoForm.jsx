import React, { Component } from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react'

import TodoActions         from '../../actions/TodoActions';
import PersonMemoryStore   from '../../store/PersonMemoryStore';
import ToastMessageActions from '../../actions/ToastMessageActions';

export default class TodoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoTitle:  '',
            personId:   ''
        };

        this.todoChange = this.todoChange.bind(this);
        this.saveTodo   = this.saveTodo.bind(this);
        this.closeForm  = this.closeForm.bind(this);
        this.personSelectChanged = this.personSelectChanged.bind(this);
    }

    componentDidMount() {
        if(this.props.todo && this.props.todo.id) {
            this.setState({ todoTitle: this.props.todo.title });
        }

        if(this.props.person && this.props.person.id) {
            this.setState({ personId: this.props.person.id });
        }
    }

    render() {
        let people = PersonMemoryStore.getItems(),
            options = PersonMemoryStore.getItems().map( person => {
                return {
                    key:    person.id,
                    value:  person.id,
                    text:   person.first_name + (person.last_name ? ' ' + person.last_name : '')
                }
            }),
            dropdown = this.props.person ?
                <Dropdown selection fluid
                    placeholder="Who do you want to do it?"
                    options={options} disabled
                    onChange={this.personSelectChanged}
                    defaultValue={this.props.person.id}
                /> :
                <Dropdown selection fluid
                    placeholder="Who do you want to do it?"
                    options={options}
                    onChange={this.personSelectChanged}
                />
        ;

        return (
            <Form>
                <Form.Field>
                    <label>TODO:</label>
                    <input placeholder="What do you want done?"
                        ref={(el) => { el && el.focus(); }}
                        value={this.state.todoTitle}
                        onChange={this.todoChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Assign To:</label>
                    {dropdown}
                </Form.Field>
                <Button type='submit' onClick={this.saveTodo}>Save</Button>
                <Button type='submit' onClick={this.closeForm}>Cancel</Button>
            </Form>
        );
    }

    todoChange(e) {
        this.setState({ todoTitle: e.target.value });
    }

    closeForm(e) {
        e.preventDefault();
        this.props.onClose && this.props.onClose();
        return false;
    }

    saveTodo(e) {
        let data = {
            title:      this.state.todoTitle,
            person_id:  this.state.personId
        };

        if(!data.title) {
            ToastMessageActions.error('Please enter something to do');
            e.preventDefault();
            return false;
        }

        if(!data.person_id) {
            ToastMessageActions.error('You must assign work to do to someone');
            e.preventDefault();
            return false;
        }

        if(this.props.todo && this.props.todo.id) {
            data.id = this.props.todo.id;
        }

        e.preventDefault();
        TodoActions.save(data);
        this.props.onClose && this.props.onClose();
        return false;
    }

    personSelectChanged(e) {
        //
    }
}
