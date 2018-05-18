import React, { Component } from 'react';

import 'semantic-ui-css/semantic.min.css';

import { Container } from 'semantic-ui-react'

import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default class Shell extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="app-shell">
                <Header />

                <Container text style={{ marginTop: '7em', flex: 1 }}>
                    {this.props.children}
                </Container>

                <Footer />
            </div>
        );
    }
}
