import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

function Footer(props) {
    return (
        <FooterWrapper>
        <div>
            <p className='footerText'>010-000-0000</p>
            <p className='footerText'>OPEN.AM:11~PM:18</p>
            <p className='footerText'>기업은행 : 123-12312-12-112 홍길동</p>
            <p className='footerText'>ORDER TRACKING</p>
            <p className='footerText'>KG이니시스 구매안전서비스 가맹점</p>
        </div>

        <div>
            <Link to='/' className='footerText'>HOME</Link>
            <Link to='/' className='footerText'>ABOUT</Link>
            <Link to='/' className='footerText'>AGREEMENT</Link>
            <Link to='/' className='footerText'>PRIVACY POLICY</Link>
            <Link to='/' className='footerText'>GUIDE</Link>
        </div>

        <div>
            <p className='footerText'>COMPANY : 리액트 마켓</p>
            <p className='footerText'>OWNER : 홍길동</p>
            <p className='footerText'>MAIL ORDER  LICENSE : 2022-서울시-1111</p>
            <p className='footerText'>ADRESS : 서울시 강남구</p>
            <p className='footerText'>CPO : 홍길동(guswjd1344@gmail.com)</p> 
            <p className='footerText'>Copyright 리액트 마켓.All rights reserved</p> 
        </div>
    </FooterWrapper>
    );
}

export default Footer;

const FooterWrapper = styled.footer`
    display: flex;
    max-width: 1280px;
    width: 100%;
    justify-content: space-between;
    padding: 50px 0px 20px;
    margin: 0px auto;
    div{
        display: flex;
        flex-direction: column;
        gap: 10px;
        *{
            font-size: 12px;
            color: #999;
        }
    }

`