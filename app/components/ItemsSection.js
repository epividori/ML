import React, { Component } from 'react';
import Styles from './styles/item_style.css';
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
                        <ItemList/>
                    </div>
                </div>
            </div>
        )
    }
}
export default ItemsSection;