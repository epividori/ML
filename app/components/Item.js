import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Number from './commons/Number';

const shipping_img = require('../assets/img/ic_shipping.png');

class Item extends Component {
    constructor(props) {
        super(props);

        this.state= {
            redirectToItemDetail: false
        };

        this.onSelectItem = this.onSelectItem.bind(this);
    }

    onSelectItem () {
        this.setState({
            redirectToItemDetail: true
        })
    }

    render() {
        const { redirectToItemDetail } = this.state;

        if(redirectToItemDetail) {
            return (
                <div>
                    <Redirect push to={{ pathname: `/items/${this.props.id}`, state: {categories: this.props.categories} }} />
                </div>
            )
        }
        return (
            <div className="Item">
                <div className="row">
                    <div className="col-sm-auto">
                        <a onClick={this.onSelectItem}>
                            <img className="img-fluid item-picture" src={this.props.picture}/>
                        </a>
                    </div>
                    <div className="col-sm">
                        <div className="price"> 
                            <span className="amount"> 
                            {/* {this.props.price}  */}
                                <Number price={`${this.props.amount}.${this.props.decimals}`} />
                            </span>
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