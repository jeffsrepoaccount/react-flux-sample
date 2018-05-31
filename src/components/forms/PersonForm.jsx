import React, { Component } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react'

import PersonActions from '../../actions/PersonActions';
import ToastMessageActions from '../../actions/ToastMessageActions';

export default class TodoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName:  ''
        };

        this.savePerson = this.savePerson.bind(this);
        this.closeForm  = this.closeForm.bind(this);

        this.loaded = false; // Prevent autofocus from always autofocusing
    }

    componentDidMount() {
        if(this.props.person && this.props.person.id) {
            this.setState({
                firstName:  this.props.person.first_name,
                lastName:   this.props.person.last_name
            });
        }
    }

    render() {
        return (
            <Form>
                <Form.Field required>
                    <label>First Name:</label>
                    <input placeholder=""
                        ref={(el) => { 
                            el && !this.loaded && el.focus();
                            this.loaded = true;
                        }}
                        value={this.state.firstName}
                        onChange={e => { this.setState({ firstName: e.target.value }); }}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Last Name:</label>
                    <input placeholder=""
                        value={this.state.lastName}
                        onChange={e => { this.setState({ lastName: e.target.value }); }}
                    />
                </Form.Field>
                <Form.Field style={{ textAlign: 'center' }}>
                    <Button type='submit' color='blue' size='tiny' onClick={this.savePerson}>
                        <Icon name='save' />
                        Save
                    </Button>
                    <Button type='submit' color='orange' size='tiny' onClick={this.closeForm}>
                        <Icon name='cancel' />
                        Cancel
                    </Button>
                </Form.Field>
            </Form>
        );
    }

    closeForm(e) {
        e.preventDefault();
        this.props.onClose();
        return false;
    }

    savePerson(e) {
        let data = {
            first_name: this.state.firstName,
            last_name:  this.state.lastName
        };

        if(!data.first_name) {
            ToastMessageActions.error('First name is required');
            e.preventDefault();
            return false;
        }

        if(this.props.person && this.props.person.id) {
            data.id = this.props.person.id;
        }

        PersonActions.save(data);
        return this.closeForm(e);
    }
}
