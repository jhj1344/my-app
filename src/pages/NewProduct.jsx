import React, { useState } from 'react';
import { addProducts } from '../api/Firebase';
import styled from 'styled-components';
import { upLoadImg } from '../api/ImgUpload';

function NewProduct(props) {

    const [product, setProduct] = useState({
        title : '',
        price:'',
        option:'',
        category:'',

    })//모든 상품의 상태를 빈 문자열로 초기화
    const [file, setFile] = useState(null) //업로드 파일 초기화
    const [isLoading, setIsLoading] = useState(false) //업로드 상태 초기화(업로드시true)
    const [success, setSuccess] = useState(null) //업로드 완료 상태
    const [error, setError] = useState(null)

    const onChange = (e)=>{
        const {name, value, files} = e.target;

        if(name === 'file' && files && files[0]){
            setFile(files[0]);
            console.log(files[0])
        }else{
            setProduct((prevProduct)=>({...prevProduct,[name] : value}))
        }
    }

    const onSubmit = async(e)=>{
        e.preventDefault()
        //리액트는 기본 이벤트를 없애는 기능이 없기 때문에 e.preventDefault()를 항상 넣어줄 것
        setIsLoading(true);

        try{
            const url = await upLoadImg(file)
            await addProducts(product, url)//파이어 베이스 데이터 연동 스크립트 실행
            setSuccess('업로드가 완료 되었습니다.');
            setTimeout(()=>{
                setSuccess(null)
            },2000)

            setProduct({
                title : '',
                price : '',
                description : '',
                option : '',
                category : '',
            })
            setFile(null)
        }catch(error){
            console.log(error);
            setError('업로드 실패')
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <div className='container'>
            <FormContainer>
                {success && <p className='resultText'>{success}</p>}
                <div className='imgWrap'>
                    {file && (
                        <img src={URL.createObjectURL(file)} alt={product.title} />
                    )}
                </div>

                <form onSubmit={onSubmit}>
                    <input 
                        type='file' 
                        name='file' 
                        accept="'image/*" 
                        onChange={onChange}
                    />
                    {/* 이미지 업로드 */}

                    <input 
                        type='text'
                        name='title'
                        placeholder='제목을 입력하세요.'
                        value={product.title}
                        onChange={onChange} 
                    />
                    {/* 제목 */}

                    <input 
                        type='text'
                        name='price'
                        placeholder='상품 가격'
                        value={product.price}
                        onChange={onChange} 
                    />
                    {/* 가격설정 */}

                    <input 
                        type='text'
                        name='category'
                        placeholder='상품 분류'
                        value={product.category}
                        onChange={onChange}
                    />
                    {/* 상품 카테고리 */}

                    <input 
                        type='text'
                        name='option'
                        placeholder='상품 옵션'
                        value={product.option}
                        onChange={onChange}
                    />
                    {/* 상품 옵션 */}

                    <input 
                        type='text'
                        name='description'
                        placeholder='제품 설명'
                        value={product.description}
                        onChange={onChange} 
                    />

                    <button disabled={isLoading}>
                        {isLoading ? '업로드중' : '제품 등록하기'}
                    </button>
                </form>
            </FormContainer>
        </div>
    );
}

export default NewProduct;

const FormContainer = styled.div`
    max-width: 1280px;
    padding: 30px 0px;
    margin: 0px auto;
    display: flex;
    gap: 40px;
    .imgWrap{
        max-width: 500px;
        height: 500px;
        img{
            display: block;
            height: 100%;
        }
    }

    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        input{
            width: 100%;
            box-sizing: border-box;
            height: 40px;
            border-radius: 4px;
            border: none;   
        }
        button{
            margin-top: 50px;
            height: 50px;
            border-radius: 5px;
            background: pink;
            border: none;
        }
    }
`