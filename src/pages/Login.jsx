import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, loginEmail } from '../api/Firebase';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');

    const googleLogin = async ()=>{
        const user = await login();
        navigate('/')
    }

    const loginEvent = async(e)=>{
        e.preventDefault();
        try{
            const user = await loginEmail(email, password);
            if(user){
                navigate('/')
            }else{
                setErrorMsg('이메일이나 비밀번호가 일치하지 않습니다.')
            }

        }catch(error){
            console.error(error)
        }
    }

    return (
        <div className='container'>
            <h2>Login</h2>
            <form onSubmit={loginEvent}>
                <input 
                    type='email' 
                    placeholder='이메일을 입력하세요.'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <input 
                    type='password'
                    placeholder='비밀번호를 입력하세요'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)} 
                />
                <button type='submit'>로그인</button>
                <button onClick={googleLogin}>구글아이디로 로그인</button>
                {errorMsg && <span className='errorText'>{errorMsg}</span>}
            </form>
            <Link to='/join'>회원가입</Link>
        </div>
    );
}

export default Login;