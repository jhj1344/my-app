import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "./AuthContext";
import { updateCart, getCart } from "../api/Firebase";

export default function UseCart(){
    const {uid} =useAuthContext();
    const queryClient = useQueryClient();

    const cartInfo = useQuery(['cart', uid || ''], () => getCart(uid),{
        enabled : !!uid
    })

    const addItemCart = useMutation(
        //mutation : 정보를 업데이트 할때 사용하는 구문
        (product) => updateCart(uid, product),
        {
            onSuccess : () =>{
                queryClient.invalidateQueries(['cart',uid])
            }
        } 
    )
    return {addItemCart,cartInfo}
}