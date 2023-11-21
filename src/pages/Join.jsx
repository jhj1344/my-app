import React, { useState } from 'react';
import { joinEmail } from '../api/Firebase';
import { useNavigate } from 'react-router-dom';

function Join(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [psError, setPsError] = useState(''); //패스워드 에러
    const navigate = useNavigate();


    const signUpEvent = async(e)=>{
        e.preventDefault();

        if(password.length < 6){
            setPsError('비밀번호는 6글자 이상이어야 합니다.');
            return
        }

        try{
            const user = await joinEmail(email, password);
            console.log(user)
            navigate('/login')
        }catch(error){
            console.error(error)
        }
    }
    return (
        <div className='container'>
            <h2>회원가입</h2>
            <form onSubmit={signUpEvent}>
                <div>
                    <input 
                        type='email'
                        placeholder='이메일을 입력하세요'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)} 
                    />
                </div>

                <div>
                    <input 
                        type='password'
                        placeholder='비밀번호를 입력하세요'
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    {psError && <span className='errorText'>{psError}</span>}
                </div>

                <button type='submit'>회원가입 하기</button>
            </form>
        </div>
    );
}

export default Join;