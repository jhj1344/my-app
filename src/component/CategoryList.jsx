import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getCategory } from '../api/Firebase';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function CategoryList(props) {

    const {data : categories} = useQuery(['categories'], getCategory);
    const setCategory = new Set();
    //특정한 값을 배열로 출력해 줄때 중복요소를 걸러준다.

    if(categories){
        categories.forEach((categoryObj)=>{
            setCategory.add(categoryObj.category);
            //add는 배열에 추가하는 메서드
            console.log(categoryObj.category)
        })
    }
    const setCategoryArr = [...setCategory]
    console.log(setCategoryArr)

    return (
        <CategoryItemList>
            {setCategoryArr.map((category, index)=>(
                <CategoryItem key={index}>
                    <Link to={`/products/${category}`}>
                        {category}
                    </Link>
                </CategoryItem>
            ))}
        </CategoryItemList>
    );
}

export default CategoryList;
const CategoryItemList = styled.ul`
    display: flex;
    gap: 30px;
    padding: 24px;

`

const CategoryItem = styled.li`
    a{
        color: black;
    }
`