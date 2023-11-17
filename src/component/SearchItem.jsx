import { query } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { searchProduct } from '../api/Firebase';
import SearchItemList from './SearchItemList';

function SearchItem(props) {

    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);

    useEffect(()=>{

        if(query.trim() === ''){
            //trim() = 공백을 제거해주는 메서드
            setResult([]) 
        }else{
            searchProduct(query).then((text)=>{
                setResult(text);
            }).catch((error)=>{
                console.error(error)
            })
        }
    },[query])

    
    const inputEvent = (e)=>{
        setQuery(e.target.value);
        console.log(query)
    }
    return (
        <div className='container'>
            <input type='text' value={query} onChange={inputEvent} className='searchForm'/>

            <ul className='searchResultList'>
                {result.map((product)=>(
                    <SearchItemList key={product.id} products={product}/>
                ))}
            </ul>
        </div>
    );
}

export default SearchItem;