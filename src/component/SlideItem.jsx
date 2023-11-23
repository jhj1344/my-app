import React, { useEffect, useState } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';//기본 스와이퍼import
import 'swiper/css';//기본swiperCss

import {Autoplay, EffectFade} from 'swiper/modules';
import 'swiper/css/effect-fade';
import { getStorageImg, storage } from '../api/Firebase';

function SlideItem({imgs}) {
    // const sliderImg = [
    //     'https://firebasestorage.googleapis.com/v0/b/my-shop-3d18c.appspot.com/o/one%20piece_02.png?alt=media&token=f0788e30-483e-41c5-8222-fa8a31f07d6e',
    //     'https://firebasestorage.googleapis.com/v0/b/my-shop-3d18c.appspot.com/o/one%20piece_03.png?alt=media&token=0b0abb20-f976-485b-ad58-a4a75dcf9f1a',
    //     'https://firebasestorage.googleapis.com/v0/b/my-shop-3d18c.appspot.com/o/one%20piece_04.png?alt=media&token=c4a04cff-4d38-46fc-a571-0af9b4ec3e43',
    //     'https://firebasestorage.googleapis.com/v0/b/my-shop-3d18c.appspot.com/o/outer_01.png?alt=media&token=8bb3993a-158a-4349-950a-3135a31b6946',
    //     'https://firebasestorage.googleapis.com/v0/b/my-shop-3d18c.appspot.com/o/outer_02.png?alt=media&token=df6afd0f-fd44-40ff-a2c1-801f749f6c32',
    //     'https://firebasestorage.googleapis.com/v0/b/my-shop-3d18c.appspot.com/o/outer_03.png?alt=media&token=8cf98f42-e858-4b6a-b399-1bb7f67ca398',
    // ]

    const [imgUrl, setImgUrl] = useState([]);
    useEffect (()=>{
        const loadImg = async ()=>{
            try{
                const urls = await Promise.all(
                    imgs.map((imgPath)=>getStorageImg(imgPath))
                );
                setImgUrl(urls)
                //console.log(imgUrl)
            }catch(error){
                console.error(error)
            }
        }
        loadImg()
    }, [imgs])
    
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
                {imgUrl.map((el,index)=>(
                    <SwiperSlide key={index} style={{background: `url(${el}) no-repeat center center /cover`}}></SwiperSlide>
                ))}
            </Swiper>
        
        </>
    );
}

export default SlideItem;