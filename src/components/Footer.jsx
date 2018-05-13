import React, { Component } from 'react';

import moment from 'moment';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <footer className="app-footer">
                Copyright &copy;{moment().format('YYYY')} Most Rights Reserved
            </footer>
        );
    }
}
