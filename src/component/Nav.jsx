import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {logOut, login, onUserState} from '../api/Firebase';
import UserData from './UserData';
import { useAuthContext } from '../context/AuthContext';
import CategoryList from './CategoryList';

function Nav(props) {
    //const {user, login, logOut} = useAuthContext();
    const [user, setUser] = useState();
    const navigate = useNavigate();

    const userLogOut=()=>{
        logOut().then(setUser)
    }
    const userLogin=()=>{
        navigate('/login');
    }

    useEffect(()=>{
        onUserState((user)=>{
            console.log(user)
            setUser(user);
        })

    },[])
    // useEffect(()=>{
    //     onUserState(setUser);
    // },[])

    // const userLogin =()=>{
    //     login().then(setUser);
    // }
    // const userLogOut =()=>{
    //     logOut().then(setUser);
    // }

    return (
        <HeaderContainer>
            <Link to='/'>
                <h1>shop</h1>
            </Link>

            <nav>
                {/* <Link to='/products/new'>
                    신상품
                </Link> */}
                <CategoryList/>
                <Link to="/products">
                    모든 상품
                </Link>


            </nav>
    
            <div className='userWrap'>
                <Link to='/search'>검색</Link>
                    <Link to={'/cart'}>장바구니</Link>
                    {user && user.isAdmin && (
                        <Link to="/products/new">
                            상품등록
                        </Link>
                    )}
                    {/* {user && <UserData user={user}/>}
                    {!user && <button onClick={login} className='loginBtn'>Login</button>}
                    {user && <button onClick={logOut} className='logoutBtn'>LogOut</button>}  */}
                    {/* <Link to='/login'>
                        로그인
                    </Link> */}
                    {user ? (
                        <>
                            {user && <UserData user={user}/>}
                            <button onClick={userLogOut} className='logoutBtn'>logout</button>
                        </>
                    ) : (
                        // <Link to='/login'>
                        //     <button className='loginBtn'>login</button>
                        // </Link>
                        <button onClick={userLogin} className='loginBtn'>login</button>
                    )}
            </div>
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