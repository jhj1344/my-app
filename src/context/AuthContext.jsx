import { createContext, useContext, useEffect, useState } from "react";
import { onUserState, login, logOut } from "../api/Firebase";

const AuthContext = createContext();

export function AuthContextProvider({children}){
    const [user, setUser] = useState();
    const [unSubScribe, setUnSubScribe] = useState();

    useEffect(()=>{
        const userChange = (newUser)=>{
            console.log(newUser);
            setUser(newUser);
        };
        const UnSubScribeFunc = onUserState(userChange);
        setUnSubScribe(()=>UnSubScribeFunc);

        return ()=>{
            if(UnSubScribeFunc){
                UnSubScribeFunc();
            }
        }
    },[])

    return(
        <AuthContext.Provider value={{user, login, logOut, uid:user && user.uid}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    return useContext(AuthContext)
}