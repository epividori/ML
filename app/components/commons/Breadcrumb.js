import React, { Component } from 'react';
import { FaAngleRight  } from 'react-icons/fa';
import Style from '../styles/breadcrumb_style.css';

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        var length = this.props.paths.length;
        const paths = this.props.paths ? this.props.paths : [];

        var list = paths.map(path => {
            if((length--) == 1) {
                return (
                    <li className="breadcrumb-li" key={path}>
                        <strong>{path}</strong>
                    </li>
                )
            }

            return (
                <li className="breadcrumb-li" key={path}>
                    {path}
                    <FaAngleRight />
                </li>
            )
        })

        return (
            <nav className="Breadcrumb col-md-12" aria-label="breadcrumb">
                <ul>
                    { list }
                </ul>
            </nav>
        )
    }
}

export default Breadcrumb;