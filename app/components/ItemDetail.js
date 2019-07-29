import React, { Component } from 'react';
import Breadcrumb from './commons/Breadcrumb';
import { getItem } from '../../server/services/itemService';
import Number from './commons/Number';

import Styles from './styles/item_style.css';

class ItemDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item:{}
        }
    }

    componentDidMount() {
        this.getItemDetail();       
    }

    getItemDetail(){

        const {id} = this.props.match.params;
        getItem(id)
        .then(result => this.setState({
            item: result.item
        }))
    }

    render() {
        const {item} = this.state;
        const {categories} = this.props.location.state;       
        return (
            <div className="row">
                <Breadcrumb className='col-12' paths={categories}/>
                <div className='Items col-12'>
                    <div className="row">
                        <div className="col-sm-auto item-big-picture ">
                            <div className="text-center">
                                <img className="img-fluid" src={item.picture} />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="item-basic-info">
                                <div className="item-condition">
                                    {
                                        item.condition == 'new' ? 
                                        'Nuevo' : 
                                        'used' ? 
                                        'Usado' : ''
                                    }
                                    {
                                        item.sold_quantity == 1 ? 
                                        ` - ${item.sold_quantity} vendido` :
                                        ` - ${item.sold_quantity} vendidos`
                                    } 
                                </div>
                                <div className="item-title">
                                    {item.title}
                                </div>
                                <div className="item-price">
                                    {
                                        item.price ? 
                                        <Number price={`${item.price.amount}.${item.price.decimals}`} />
                                        : ''
                                    }
                                </div>
                                <div className='item-button'>
                                    <button className='btn btn-primary btn-block'>
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div className="row">
                        <div className="col-12">
                            <div className="item-description">
                                <div className="h2">Descripción del producto</div>
                                    <div className="text">
                                    {item.description}
                                    </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        )
    }
}

export default ItemDetail;