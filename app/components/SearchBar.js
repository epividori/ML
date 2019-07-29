import React, { Component } from 'react';
import Style from './styles/search_style.css';

const logo = require('../assets/img/logo_ml.png');
const icon_search = require('../assets/img/ic_search.png');


class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: "",
            items: props.items,
            onSubmit: props.onSubmit
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }
    onInputChange(event) {      
        this.setState({
            query: event.target.value           
        });  
    }

    onSearchSubmit(event) {
        event.preventDefault();
        this.state.onSubmit(this.state.query);
    }

    render() {
        return (
            <div className='SearchBar container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-10'>
                        <div className='row'>
                            <div className='col-sm-auto align-self-center text-center'>
                                <img className='' src={logo}/>
                            </div>
                            <div className='col'>
                                <form className='input-group d-flex' onSubmit={this.onSearchSubmit}>
                                    <input className="form-control"
                                       type="text"  
                                       placeholder="Nunca dejes de buscar" 
                                       onChange={this.onInputChange}/>
                                    <div className="input-group-append">
                                        <button className="" type="submit">
                                            <img src={icon_search} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default SearchBar;