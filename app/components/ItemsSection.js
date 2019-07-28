import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import ItemList from './ItemList';

class ItemsSection extends Component {

    constructor(props){
        super(props);
    }

    render (){
        return (
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-md-10'>
                        <Switch>
                            <Route exact path='/items' component={ItemList}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}
export default ItemsSection;