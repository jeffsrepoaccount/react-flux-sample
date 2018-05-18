import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Dashboard    from './components/Dashboard.jsx';
import AddTodo      from './components/AddTodo.jsx';
import NotFound     from './components/errors/NotFound.jsx';

import './style/app.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/add-todo" component={AddTodo} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('app-root')
);
