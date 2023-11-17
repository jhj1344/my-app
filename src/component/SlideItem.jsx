import React, { useEffect, useState } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';//기본 스와이퍼import
import 'swiper/css';//기본swiperCss

import {Autoplay, EffectFade} from 'swiper/modules';
import 'swiper/css/effect-fade';
import { getStorageImg, storage } from '../api/Firebase';

function SlideItem(props) {
    const sliderImg = [
        'http://res.cloudinary.com/dhrxosyio/image/upload/v1699500457/sfggnyggml2c82nes9x3.png',
        'http://res.cloudinary.com/dhrxosyio/image/upload/v1699501220/hcqbibj6vucqxbdfhsds.png',
        'http://res.cloudinary.com/dhrxosyio/image/upload/v1699500426/my5n6vwcgrtucjzicivn.png',
        'http://res.cloudinary.com/dhrxosyio/image/upload/v1699500787/la8mxce599hjpczswg5u.png'

    ]

    const [imgUrl, setImgUrl] = useState([]);
    useEffect (()=>{
        async function loadImg(){
            try{
                const urls = await Promise.all(
                    imgUrl.map((imgPath)=>getStorageImg(imgPath, storage))
                )
                setImgUrl(urls);
            }catch(error){
                console.error(error)
            }
        }
        loadImg();
    },[imgUrl])
    const slider = {
        width : '500px',
        height : '600px',
    }
    return (
        <>
            <Swiper style={slider} 
                slidesPerView={1} 
                loop={true} 
                autoplay={
                    {
                        delay: 2000,
                    }}
                    speed = {3000}
                    modules={[Autoplay, EffectFade]}
                    effect={'fade'}
            >
                {sliderImg.map((el,index)=>(
                    <SwiperSlide key={index} style={{background: `url(${el}) no-repeat center center /cover`}}></SwiperSlide>
                ))}
            </Swiper>
        
        </>
    );
}

export default SlideItem;