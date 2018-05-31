import React, { Component } from 'react';
import { Container, Grid, List } from 'semantic-ui-react'

import moment from 'moment';

import { chunkArray } from '../../functions';
import packages from '../../../package.json';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.packageColumns = [];
    }

    componentWillMount() {
        // Chunk packages in packages.dependencies to an array of column names
        let numColumns = 3,
            names   = Object.keys(packages.dependencies)
            length  = parseInt(names.length / numColumns)
        ;
        // If overflow is needed, make sure it's available
        length += (length % numColumns !== 0 ? 1 : 0);

        this.packageColumns = chunkArray(names, length);
    }

    render() {
        let columns = this.packageColumns;

        return (
            <footer className="ui inverted footer vertical segment app-footer">
                <Container>
                    <Grid columns={4} celled="internally">
                        <Grid.Row>
                            <Grid.Column width={7} style={{position: 'relative', textAlign: 'right'}}>
                                <strong>This app uses the following dependencies</strong>
                            </Grid.Column>
                            {columns.map( (column, idx) => {
                                return (
                                    <Grid.Column width={3} key={idx+1}>
                                        <List>
                                            {column.map( dependency => {
                                                return (
                                                    <List.Item key={dependency}>
                                                        <a href={"https://www.npmjs.com/package/" + dependency} target="_blank">
                                                            {dependency}
                                                        </a>
                                                    </List.Item>
                                                );
                                            })}
                                        </List>
                                    </Grid.Column>
                                );
                            })}
                        </Grid.Row>
                    </Grid>
                </Container>

                <span className="copyright">
                    Copyright &copy;{moment().format('YYYY')} Jeff was here
                </span>
            </footer>
        );
    }
}
