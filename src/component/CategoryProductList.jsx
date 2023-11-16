import React from 'react';

function CategoryProductList({category,product}) {
    return (
        <div className='container'>
            <h2>{category}</h2>
            <ul className='productList'>
                {product.map((product)=>(
                    <li key={product.id}>
                        <img src={product.image}/>
                        <p>{product.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryProductList;