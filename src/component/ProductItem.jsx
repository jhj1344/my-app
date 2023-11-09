import React from 'react';
import DetailPageEvent from './DetailPageEvent';

function ProductItem({product : {id, image, title, price, option, category, description}}) {

    return (
        <li>
            <DetailPageEvent product={{id, image, title, price, option, category, description}}/>
        </li>
    );
}

export default ProductItem;