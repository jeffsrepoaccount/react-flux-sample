import React, { Component } from 'react';

import { List } from 'semantic-ui-react';

export default class Person extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let person = this.props.person;

        return (
            <List.Item key={person.id} onClick={e => {
                e.preventDefault();
                this.props.onSelect(person);
                return false;
            }}>
                {person.first_name ? person.first_name : ''}
                {person.last_name ? ' ' + person.last_name : ''}
            </List.Item>
        );
    }
}
