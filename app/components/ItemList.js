import React, { Component } from 'react';
import Breadcrumb from './commons/Breadcrumb';
import queryString from 'query-string';
import numeral from 'numeral';
import { getItems } from '../../server/services/itemService';

import Item from './Item';

class ItemList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items : [],
            categories: []
        }
    }

    componentDidMount() {
        const query = queryString.parse(this.props.location.search);
        
        if(this.props.location.search && query.search != "") {
            this.searchItems(query.search);       
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.location.search != prevProps.location.search){
            const query = queryString.parse(location.search);
            this.searchItems(query.search);       
        }
    }

    searchItems(query) {
        getItems(query)
        .then(results => this.setState({
            items: results.items,
            categories: results.categories,
            hasresults: true
        }))
    }

    render() {
        const {items, categories} = this.state;
        if (this.state.hasresults)
        {
            return (
                <div className="row">
                    <Breadcrumb className='col-12' paths={categories}/>
                    <div className='Items col-12'>
                    {
                        (!items.length) ?
                        <span>
                            Sin resultados.
                        </span>                
                        :
                        items.map(item => {
    
                            var price = item.price.amount + '.' + item.price.decimals;
                            price = numeral(price).format('$ 0,0[.]00');
    
                            return <Item key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            price={price} 
                                            amount={item.price.amount}
                                            decimals={item.price.decimals}
                                            picture={item.picture}
                                            condition={item.condition}
                                            free_shipping={item.free_shipping}
                                            sold_quantity={item.sold_quantity}
                                            description={item.description}
                                            address={item.address}
                                            categories={categories}
                                    />;
                            })
                    }
                    </div>
                </div>
            )
        }
        
        return <div></div>;
    }
}
export default ItemList;