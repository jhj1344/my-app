import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryProduct } from '../api/Firebase';
import CategoryProductList from './CategoryProductList';
import SlideItem from './SlideItem';

function CategoryPage(props) {
    const [product, setProduct] = useState([]);
    const {category} = useParams(); //catagory에 담겨 있는 정보를 가져옴

    useEffect(()=>{
        getCategoryProduct(category)
        .then((products)=>{
            setProduct(products);
        })
        .catch((error)=>{
            console.error(error);
        })
    },[category])

    return (
        <div>
            <SlideItem/>
            <CategoryProductList category={category} product={product}/>
        </div>
    );
}

export default CategoryPage;