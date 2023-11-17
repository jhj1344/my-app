import React from 'react';
import Products from '../component/Products';
import SlideItem from '../component/SlideItem';

function AllProduct(props) {
    return (
        <div className='container'>
            <SlideItem />
            <Products/>
        </div>
    );
}

export default AllProduct;