import React, { Component } from 'react';

import Shell from '../layout/Shell.jsx';

export default class NotFound extends Component {
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
            <Shell>

                Whoops!

            </Shell>
        );
    }
}
