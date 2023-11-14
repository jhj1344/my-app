import React from 'react';
import UseCart from '../context/UseCart';

function CartList({product, index}) {
    //const{addItemCart} = UseCart();

    return (
        <li>
            <p>{index}</p>
            <img src={product.image} alt={product.title} />
            <p>{product.title}</p>
        </li>
    );
}

export default CartList;