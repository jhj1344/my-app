import React, { useEffect, useState } from 'react';
import Products from '../component/Products';
import SlideItem from '../component/SlideItem';
import { listAll, ref } from 'firebase/storage'; //데이터베이스가 아니라 스토리지
import { getStorageImg, storage } from '../api/Firebase';

function AllProduct(props) {
    // const slidePath = [
    //     'https://firebasestorage.googleapis.com/v0/b/my-shop-3d18c.appspot.com/o/one%20piece_02.png?alt=media&token=f0788e30-483e-41c5-8222-fa8a31f07d6e',
    //     'https://firebasestorage.googleapis.com/v0/b/my-shop-3d18c.appspot.com/o/one%20piece_03.png?alt=media&token=0b0abb20-f976-485b-ad58-a4a75dcf9f1a',
    //     'https://firebasestorage.googleapis.com/v0/b/my-shop-3d18c.appspot.com/o/one%20piece_04.png?alt=media&token=c4a04cff-4d38-46fc-a571-0af9b4ec3e43',
    //     'https://firebasestorage.googleapis.com/v0/b/my-shop-3d18c.appspot.com/o/outer_01.png?alt=media&token=8bb3993a-158a-4349-950a-3135a31b6946',
    //     'https://firebasestorage.googleapis.com/v0/b/my-shop-3d18c.appspot.com/o/outer_02.png?alt=media&token=df6afd0f-fd44-40ff-a2c1-801f749f6c32',
    //     'https://firebasestorage.googleapis.com/v0/b/my-shop-3d18c.appspot.com/o/outer_03.png?alt=media&token=8cf98f42-e858-4b6a-b399-1bb7f67ca398',
    // ]

    const [imgUrls, setImgUrls] = useState([]);

    useEffect(()=>{
        const fetchImgs = async()=>{
            const imgListRef = ref(storage);
            try{
                const imgRef = await listAll(imgListRef);
                const selectRef = categoryRandomRef(imgRef.items, 4);
                const urls = await Promise.all(
                    selectRef.map((ref)=>getStorageImg(ref))
                );
                setImgUrls(urls);
            }catch(error){
                console.error(error);
            }
            
        }
        fetchImgs();
    },[])
    console.log(imgUrls)

    function categoryRandomRef(refs, count){
        return refs.sort(()=>0.5 - Math.random()).slice(0,count)
        /*
        순서를 무작위로 섞는 공식
        sort : 순서를 특정한 기준에 의해서 정렬을 하는 메서드[-1,0,1]
        받아온 배열에서 sort를 돌려서 -1,0,1이 나오도록 랜덤의 수를 생성(maht.random)
        maht.random은 0~1사이의 값을 반환하게 되는데 반환되는 값에서 0.5를 빼면
        균등하게 음수와 양수를 뽑아낼 수 있다.
        0.5외에 다른 숫자가 들어올 수 있지만 가장 균등한 확률은 중간값인 0.5를 넣어준다.
        slice는 정렬된 배열중에서 시작순번부터 끝나는 순번까지 잘라내는 역할을 한다.

        ex)a,b를 sort를 이용해서 정렬할때
        -1을 반환하게 되면 앞으로 가게되고
        1을 반환하게 되면 뒤로 가게 되며
        0을 반환할 경우 정렬하지 않는다.
        
        */

    }

    return (
        <div className='container'>
            <SlideItem imgs={imgUrls}/>
            <Products/>
        </div>
    );
}

export default AllProduct;