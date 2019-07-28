import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/App';
import Items from './components/ItemsSection';


const routing = (
    <BrowserRouter>
        <Route path="/" component={App} />
        <Route path="/items" component={Items} />
    </BrowserRouter>
)
ReactDOM.render(routing, document.getElementById('app'));