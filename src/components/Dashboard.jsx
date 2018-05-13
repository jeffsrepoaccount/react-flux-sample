import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Button, Modal, Header, Icon } from 'semantic-ui-react';

import TodoStore from '../store/TodoStore';
import TodoActions from '../actions/TodoActions';

import Shell from './Shell.jsx';
import TodoForm from './forms/TodoForm.jsx';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: null,
            hovering: null,
            confirmDelete: false,
            deletingTodo: null,
            editTodo: null
        };

        this.todosChanged = this.todosChanged.bind(this);
        this.renderTodo = this.renderTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
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
                    <List divided relaxed>
                        {this.state.todos.map(this.renderTodo)}
                    </List>
                    :
                    <em>Loading...</em>
                }

                <Modal basic size="small" open={this.state.confirmDelete}
                    style={{
                        marginTop: '0px !important',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                >
                    <Header icon="warning circle" content="Warning" />
                    <Modal.Content>
                        <h3>This will semi-permanently delete the following life goal:</h3>
                        
                        <h3>
                            <em>{this.state.deletingTodo ? this.state.deletingTodo.title : ''}</em>
                        </h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="green" onClick={this.confirmDelete} inverted>
                            <Icon name='checkmark' /> JUST.. DO IT
                        </Button>
                        <Button color="red" onClick={this.cancelDelete} inverted>
                            <Icon name='close' /> Nevermind
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Shell>
        );
    }

    renderTodo(todo) {
        return (
            <List.Item key={todo.id}
                style={{ position: 'relative', padding: '1em', marginTop: '0.5em' }}
                onMouseEnter={e => {
                    this.setState({ hovering: todo.id });
                }}
                onMouseLeave={e => {
                    this.setState({ hovering: null });
                }}
            >
                {this.state.hovering == todo.id &&
                    <span className="pull-right">
                        <Button icon="edit" color="blue" size="mini"
                            disabled={this.state.confirmDelete || !!this.state.editTodo}
                            onClick={this.editTodo(todo)} />
                        <Button icon="delete" color="red" size="mini"
                            disabled={this.state.confirmDelete || !!this.state.editTodo}
                            onClick={this.deleteTodo(todo)} />
                    </span>
                }
                {this.state.editTodo && this.state.editTodo.id == todo.id ?
                    <div style={{maxWidth: '80%' }}>
                        <TodoForm todo={todo} onCancel={this.cancelEdit} />
                    </div>
                    : todo.title
                }
            </List.Item>
        );
    }

    todosChanged() {
        this.setState({
            todos: TodoStore.items,
            confirmDelete: false,
            deletingTodo: null
        });
    }

    deleteTodo(todo) {
        return (e) => {
            e.preventDefault();
            this.setState({
                confirmDelete: true,
                deletingTodo: todo
            });
            return false;
        };
    }

    cancelDelete(e) {
        e.preventDefault();
        this.setState({
            confirmDelete: false,
            deletingTodo: null
        });
        return false;
    }

    cancelEdit(e) {
        e.preventDefault();
        this.setState({ editTodo: null });
        return false;
    }

    confirmDelete(e) {
        TodoActions.delete(this.state.deletingTodo);
    }

    editTodo(todo) {
        return (e) => {
            e.preventDefault();
            this.setState({ editTodo: todo });
            return false;
        };
    }
}
