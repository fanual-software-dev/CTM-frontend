import { createContext, useContext, useEffect, useReducer } from "react";

export const AuthContext = createContext()

export const Authreducer = (action,state)=>{

    switch(action.type) {

        case "GROUPID_CHANGED":
            return {
                gid:action.payload    
            }

        default:
            return state
    }
}

export const Authprovider = ({children})=>{
    
    const [state,dispatch] = useReducer(Authreducer,{
        gid:null
    })

    // const g_id = localStorage.getItem('gid')

    // if (g_id){
    //     dispatch({type:'GROUPID_CHANGED',payload:g_id})
    // }

    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthHook = ()=>useContext(AuthContext)