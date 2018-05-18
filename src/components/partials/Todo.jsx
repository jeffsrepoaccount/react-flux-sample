import React, { Component } from 'react';

import { List, Button, Modal, Header, Icon } from 'semantic-ui-react';

import TodoForm     from '../forms/TodoForm.jsx';
import TodoActions  from '../../actions/TodoActions';

export default class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hovering: false,
            editing: false,
            deleting: false
        };

        this.cancelEdit         = this.cancelEdit.bind(this);
        this.cancelDelete       = this.cancelDelete.bind(this);
        this.openDeleteModal    = this.openDeleteModal.bind(this);
        this.confirmDelete      = this.confirmDelete.bind(this);
    }

    render() {
        let todo = this.props.todo;

        return (
            <List.Item key={todo.id}
                style={{ position: 'relative', padding: '1em', marginTop: '0.5em' }}
                onMouseEnter={e => {
                    this.setState({ hovering: true });
                }}
                onMouseLeave={e => {
                    this.setState({ hovering: false });
                }}
            >
                {this.state.hovering &&
                    <span className="pull-right">
                        <Button icon="edit" color="blue" size="mini"
                            disabled={this.state.editing || this.state.deleting}
                            onClick={e => {
                                this.setState({ editing: true });
                            }} />
                        <Button icon="delete" color="red" size="mini"
                            disabled={this.state.editing || this.state.deleting}
                            onClick={this.openDeleteModal} />
                    </span>
                }
                {this.state.editing ?
                    <div style={{maxWidth: '80%' }}>
                        <TodoForm todo={todo} onCancel={this.cancelEdit} />
                    </div>
                    : todo.title
                }

                <Modal basic size="small" open={this.state.deleting}
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
                            <em>{this.props.todo.title}</em>
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
            </List.Item>
        );
    }

    cancelEdit(e) {
        e.preventDefault();
        this.setState({ editing: false });
        return false;
    }

    cancelDelete(e) {
        e.preventDefault();
        this.setState({ deleting: false });
        return false;
    }

    openDeleteModal(e) {
        e.preventDefault();
        this.setState({ deleting: true });
        return false;
    }

    confirmDelete(e) {
        e.preventDefault();
        this.setState({ deleting: false });
        TodoActions.delete(this.props.todo);
        return false;
    }
}
