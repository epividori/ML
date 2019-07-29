import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/App';
import NotFound from './components/commons/NotFound';


const routing = (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={App} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)
ReactDOM.render(routing, document.getElementById('app'));