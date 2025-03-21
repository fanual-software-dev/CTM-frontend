// function to fetch groups

import { GroupHook } from "../contexts/GroupContext"

export const Groupfetch = async ()=>{
    const {user,token} = JSON.parse(localStorage.getItem('user'))
    
    

    const res = await fetch('https://ctm-backend.vercel.app/group/all-groups',{
        method:'POST',
        body:JSON.stringify({groups_ID:user.groups_ID}),
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    })

    if (res.ok){
        const data = await res.json()
        
        return data
    }

    return false

}