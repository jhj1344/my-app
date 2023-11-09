import React from 'react';
import { useLocation } from 'react-router-dom';

function ProductDetail(props) {
    const state = useLocation().state
    console.log(state)
    const {id, image, title, description, price, option} = state;
    //useLocation() : 현재 url의 정보를 가져오는 리액트 돔 훅
    return (
        <div className='container'>
            <div className='detailPage'>
                <div className='detailImg'>
                    <img src={image} alt={title}/>
                </div>

            </div>
        </div>
    );
}

export default ProductDetail;