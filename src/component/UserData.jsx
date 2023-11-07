import React from 'react';
import styled from 'styled-components';

function UserData({user : {photoURL, displayName}}) {
    return (
        <UserItem>
            <img src={photoURL} alt={displayName}/>
            <span className='hidden'>{displayName}</span>
        </UserItem>
    );
}

export default UserData;

const UserItem = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    img{
        width: 36px;
        border-radius: 100%;
    }
`