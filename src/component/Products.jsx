import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getProducts } from '../api/Firebase';
import ProductItem from './ProductItem';

function Products(props) {
    //서버에 데이터와 동기화를 시켜주는 hook = react-query
    //state를 대체하는 데이터 동기화 hook
    //yarn add @tanstack/react-query 설치
    //react-query은 3버전까지만 나왔으며 최신버전은 @tanstack/react-query로 바뀜
    
    const {
        isLoading,
        error,
        data : products,
    } = useQuery ({
        queryKey : ['products'], //가져올려는 값
        queryFn : getProducts //값을 가져올때 사용할 함수
    })
    console.log(products)

    return (
        <>
            {isLoading && <p>상품 정보를 업데이트 중입니다.</p>}
            {error && <p>상품 정보를 불러올 수 없습니다.</p>}

            <ul className='productList'>
                {products && products.map(product => (
                    <ProductItem key={product.id} product={product}/>
                ))
                }
            </ul>
        
        </>
    )
}

export default Products;