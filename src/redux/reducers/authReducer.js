import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "../actions/authActions"


const initState={
    user:localStorage.getItem("user")||[]}

export const authReducer=(state=initState,action)=>{
    switch(action.type){
        case REGISTER_USER:
            case LOGIN_USER:
            localStorage.setItem("user", JSON.stringify(action.payload))
            return {
                ...state, user:action.payload
            }
            case LOGOUT_USER:
                localStorage.removeItem("user");
                return {...state,user:null}
            default:
                return state;
    }
    
}