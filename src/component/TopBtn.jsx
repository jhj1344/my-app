import React, { useEffect, useState } from 'react';

function TopBtn(props) {
    //useState와 useEffect를 이용해서 특정 스크롤값(300px)이 이동하게 되면
    //top버튼이 생기도록 수정
    //스크롤 이동값 알아내는 메서드 pageYOffset

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisible = ()=>{
        if(window.pageYOffset > 300){
            setIsVisible(true);
        }else{
            setIsVisible(false);
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll', toggleVisible);
        return ()=>{
            window.removeEventListener('scroll',toggleVisible);
            //마운트가 해제될때 이벤트까지 삭제
        }
    },[])
    /*
    useEffect에 이벤트를 지정하는 이유

    생명주기 관리에 용이 - 컴포넌트가 마운트가 되고 마운트가 해제되는 것들을
    컨트롤할 수 있다.

    불필요한 행동 방지
    useEffect로 리랜더링 될때마다 새 이벤트가 추가로 발생하는 경우를 방지

    성능 최적화

    */

    const scrollTopEvent = ()=>{
        window.scrollTo({
            top : 0,
            behavior : 'smooth'
        });
    }
    const scrollBottomEvent =()=>{
        window.scrollTo({
            top : document.documentElement.scrollHeight,
            behavior : 'smooth'
        });
    }

    /* 
    scrollTo : 문서에서 지정된 위치로 이동
    기준 : 문서의 좌측상단을 기준으로 한다(top, left가 기준)
    top : y축
    left : x축

    behavior : 이동 애니메이션 속성
    기본값 auto : 바로 위치로 이동
    smooth : 부드럽게 이동
    
    */
    return (
            <div 
            style={{
                position : 'fixed', 
                bottom : '50px', 
                right : '50px',
                opacity : isVisible ? 1 : 0,
                transition : 'opacity 500ms',
                pointerEvents : isVisible ? 'auto' : 'none',
                }}>

                <button onClick={scrollTopEvent}>top</button>
                <button onClick={scrollBottomEvent}>bottom</button>
            </div>
    );
}

export default TopBtn;