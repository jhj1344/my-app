import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

function Nav(props) {
    return (
        <HeaderContainer>
            <Link to='/'>
                <h1>shop</h1>
            </Link>

            <nav>
                <Link to='/products/new'>
                    신상품
                </Link>
                <Link to="/products">
                    모든 상품
                </Link>

                <div className='userWrap'>
                    <button className='loginBtn'>Login</button>
                    <button className='logoutBtn'>LogOut</button>
                </div>
            </nav>
        </HeaderContainer>
    );
}

export default Nav;

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    padding: 12px;
    gap: 24px;
    a{
        text-decoration: none;
        color: #333333;
        h1{
            font-size: 30px;
        }
    }
    nav{
        display: flex;
        align-items: center;
        gap: 12px;
        margin-left: 50px;
    }
    .userWrap{
        display: flex;
        margin-left: auto;
        align-items: center;
        gap: 12px;
        button{
            border: none;
            padding: 6px 12px;
            cursor: pointer;
            border-radius: 6px;
        }
        .loginBtn{
            background: pink;
        }
        .logoutBtn{
            background: lightgray;
        }
    }
`