import React, { Component } from 'react';

import { List, Button, Icon } from 'semantic-ui-react';

import Person       from './Person.jsx';
import PersonForm   from '../forms/PersonForm.jsx';

export default class PeopleList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addingPerson: false
        };
    }

    render() {
        if(!this.props.people) {
            return (
                <em>Loading...</em>
            );
        }

        if(!this.props.people.length) {
            return (
                <em>No People Listed</em>
            );
        }

        let canAdd       = this.props.allowAdd,
            addingPerson = this.state.addingPerson
        ;

        return (
            <div>
                <List divided relaxed selection>
                    {this.props.people.map(person => {
                        return (
                            <Person key={person.id} person={person} onSelect={this.props.onSelect} />
                        );
                    })}
                </List>
                {canAdd ?
                    (addingPerson ?
                        <PersonForm onClose={() => { this.setState({ addingPerson: false }); }} />
                        :
                        <Button color="green"
                            onClick={ () => { this.setState({ addingPerson: true }); }}>
                            <Icon name="add user" /> Add Person
                        </Button>
                    )
                    : ''
                }
            </div>
        );
    }
}
