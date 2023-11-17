import React from 'react';
import DetailPageEvent from './DetailPageEvent';

function SearchItemList({products : {id,title,image,price,option,description}}) {
    return (
        <li>
            <DetailPageEvent product={{id,image,title,price,option,description}}/>

        </li>
    );
}

export default SearchItemList;