import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Icon } from 'semantic-ui-react';
import { Pie } from 'react-chartjs';

import TodoMemoryStore    from '../store/TodoMemoryStore';
import PersonMemoryStore  from '../store/PersonMemoryStore';
import TodoActions        from '../actions/TodoActions';
import PersonActions      from '../actions/PersonActions';

import Shell        from './layout/Shell.jsx';
import TodoList     from './partials/TodoList.jsx';
import PeopleList   from './partials/PeopleList.jsx';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos:          null,
            people:         null,
            selectedPerson: null,
            addingPerson:   false
        };

        this.todosChanged       = this.todosChanged.bind(this);
        this.peopleChanged      = this.peopleChanged.bind(this);
        this.chartData          = this.chartData.bind(this);

    }

    componentDidMount() {
        TodoMemoryStore.on('change', this.todosChanged);
        PersonMemoryStore.on('change', this.peopleChanged);
        this.refresh();
    }

    componentWillUnmount() {
        TodoMemoryStore.removeListener('change', this.todosChanged);
        PersonMemoryStore.removeListener('change', this.peopleChanged);
    }

    render() {
        let selectedPerson  = this.state.selectedPerson,
            addingPerson    = this.state.addingPerson,
            todos           = this.state.todos,
            chartData       = this.chartData(),
            chartOptions    = {
                animateRotate: false
            }
        ;

        return (
            <Shell>
                <Grid columns={2} celled="internally" style={{minHeight: '80vh'}}>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Container>
                                <PeopleList people={this.state.people}
                                    allowAdd={true}
                                    onSelect={person => { this.setState({ selectedPerson: person }); }}
                                />
                            </Container>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Container>
                                {selectedPerson ?
                                    <div>
                                        <div style={{float: 'right' }}>
                                            <Button color='blue' size='mini'
                                                onClick={e => { this.setState({ selectedPerson: null }); }}
                                            >
                                                <Icon name='pointing left' />
                                                Back to Dashboard
                                            </Button>
                                        </div>
                                        <h3>{selectedPerson.first_name}&apos;s To Dos:</h3>
                                        <TodoList todos={selectedPerson.todos}
                                            allowAdd={true}
                                            person={selectedPerson}
                                        />
                                    </div>
                                    :
                                    <div>
                                        <h1>Workload Allocation</h1>
                                            {todos && todos.length ?
                                                <Pie
                                                    data={chartData}
                                                    options={chartOptions}
                                                    width="200"
                                                    height="200"
                                                />
                                                :
                                                <em>No work assigned yet</em>
                                            }
                                    </div>
                                }
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Shell>
        );
    }

    refresh() {
        TodoActions.list();
        PersonActions.list();
    }

    todosChanged() {
        this.setState({
            todos: TodoMemoryStore.getItems()
        });
    }

    peopleChanged() {
        this.setState({
            people: PersonMemoryStore.getItems()
        });
        TodoActions.list();
    }

    chartData() {
        let data    = [],
            counts  = {}
        ;

        if(!this.state.todos || !this.state.people) {
            return data;
        }

        this.state.todos.forEach( todo => {
            counts[todo.person_id] = !counts[todo.person_id] ?
                1 : counts[todo.person_id] + 1
            ;
        });

        this.state.people.forEach( person => {
            data.push({
                value: counts[person.id] ? counts[person.id] : 0,
                label: person.first_name + (person.last_name ? ' ' + person.last_name : '')
            });
        });

        return data;
    }
}
