import React from 'react';
import UseCart from '../context/UseCart';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'

function CartList({product, index}) {
    const{addItemCart, deleteItem} = UseCart();
    const setPrice = parseInt(product.price).toLocaleString()

    const plusItem = ()=>{
        addItemCart.mutate({...product, quantity : product.quantity +1})
    }
    const minusItem =()=>{
        if(product.quantity < 2){
            alert('상품 갯수는 1보다 작을 수 없습니다.');
            return
        }
        addItemCart.mutate({...product, quantity : product.quantity -1})
    }

    const itemDelete=()=>{
        deleteItem.mutate(product.id)
    }

    return (
        <li>
            <p>{index}</p>
            <img src={product.image} alt={product.title} />
            <p>{product.title}</p>
            <p>{product.option}</p>
            <p>{setPrice} 원</p>

            <AiOutlinePlus onClick={plusItem}/>
            <AiOutlineMinus onClick={minusItem}/>
            <p>수량 : {product.quantity}</p>
            <button onClick={()=>itemDelete(product.id)}>삭제</button>

            
        </li>
    );
}

export default CartList;