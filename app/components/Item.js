import React, { Component } from 'react';

import Styles from './styles/item_style.css';

const shipping_img = require('../assets/img/ic_shipping.png');

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Item">
                <div className="row">
                    <div className="col-sm-auto">
                        <img className="img-fluid item-picture" src={this.props.picture}/>
                    </div>
                    <div className="col-sm">
                        <div className="price"> 
                            <span className="amount"> {this.props.price} </span>
                            {
                                this.props.free_shipping ? 
                                <span>
                                    &nbsp;<img src={shipping_img} />
                                </span>
                                : ''
                            }      
                        </div>       
                        <div className="title">
                            {this.props.title}
                        </div>                    
                    </div>
                    <div className='col-sm-2'>
                        <div className='address'>{this.props.address}</div>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }
}

export default Item;