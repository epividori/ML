    
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import SearchBar from './SearchBar';
import Items from './ItemsSection';


import Styles from './styles/styles.css';

class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
          redirectToItems: false,
          search: '',
          items: []
      }

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
    }

    handleSubmit(query) {
      this.setState({
        redirectToItems: true,
        search: query
      })
    }

    render() {
        const { redirectToItems } = this.state;
        const { search } = this.state;

        if(redirectToItems) {
          return (
            <div>
                <App/>
                <Redirect push to={{ pathname: '/items', search: `search=${search}` }} />
            </div>
          )
        }

        return (
          <div className="App">
            <SearchBar onSubmit={this.handleSubmit} />
              <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/items' component={Items} />
              </Switch>
          </div>
        )
    }
};
  
export default App;