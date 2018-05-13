import React, { Component } from 'react';

import { Container, Menu, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

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
            <div className="">
                <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item as='li' header>
                          <Link to="/">
                              <Image
                                size='mini'
                                src='/static/logo.png'
                                style={{ marginRight: '1.5em' }}
                              />
                              Jeff's TODO List
                            </Link>
                        </Menu.Item>
                    </Container>
                </Menu>
                
            </div>
        );
    }
}
