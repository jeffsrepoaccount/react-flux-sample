import React, { Component } from 'react';

import 'semantic-ui-css/semantic.min.css';
import 'toastr/build/toastr.min.css';
import 'animate.css/animate.min.css';

import { Container } from 'semantic-ui-react'
import { ToastContainer } from "react-toastr";

import ToastMessageStore from '../../store/ToastMessageStore';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default class Shell extends Component {
    constructor(props) {
        super(props);

        this.toastContainer = null;
    }

    componentDidMount() {
        ToastMessageStore.setFactory(this.toastContainer);
    }

    render() {
        return (
            <div className="app-shell">
                <Header />

                <Container style={{ marginTop: '4em', flex: 1 }}>
                    {this.props.children}
                </Container>

                <ToastContainer
                    ref={el => this.toastContainer = el}
                    className="toast-bottom-right"
                />
                <Footer />
            </div>
        );
    }
}
