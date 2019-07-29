import React from 'react';
import numeral from 'numeral';


const Number = (props)  => {
    var number = numeral(props.price).format('$ 0,0[.]00');

    return (
        <span>{number}</span>
    );
}

export default Number;