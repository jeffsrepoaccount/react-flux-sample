import React, { Component } from 'react';

import { Container, Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="">
                <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item as='li' header>
                          <Link to="/">
                              <Icon name="checkmark box" />
                              Todo Manager Elite
                            </Link>
                        </Menu.Item>
                    </Container>
                </Menu>
                
            </div>
        );
    }
}
