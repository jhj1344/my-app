import React from 'react';
import UseCart from '../context/UseCart';
import CartList from '../component/CartList';

function MyCart(props) {
    const {cartInfo : {data:products}} = UseCart()
    const isItem = products && products.length >0;
    return (
        <div className='container'>
            <h2>장바구니 리스트</h2>
            {!isItem && <p>장바구니에 상품이 없습니다.</p>}

            {isItem &&(
                <ul className='cartList'>
                    {products && products.map((product, index)=>(
                        <CartList key={product.id} product={product} index={index}/>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MyCart;