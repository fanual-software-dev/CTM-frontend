import { createContext, useContext, useReducer } from "react";

export const GroupContext = createContext()

export const GroupReducer = (state,action)=>{

    switch(action.type){

        case 'GET_GROUPS':
            return {
                groups: action.payload
            }
        
        case 'ADD_GROUP':
            return {
                groups:[...action.payload,...state.groups]
            } 
        
        default: 
            return state 
    }

}

export const GroupContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(GroupReducer,{
        groups:[]
    })

    return (
        <GroupContext.Provider value={{...state,dispatch}}>
            {children}
        </GroupContext.Provider>
    )
}

export const GroupHook = ()=>useContext(GroupContext)