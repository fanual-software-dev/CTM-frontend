
// funtion to fetch a single task

export const fetchTasks = async (id,token)=>{
    
    const res = await fetch(`https://ctm-backend.vercel.app/api/task/${id}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    })

    if (res.ok){
        const data = await res.json()
        return data
    }

    return null

}

// function to fetch members of a group

export const fetchMembers = async(role,token)=>{
    if (role==='admin'){
        
        const memeberusers = await fetch('https://ctm-backend.vercel.app/api/users',{
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })

        const memberData = await memeberusers.json()

        if (memeberusers.ok){

            let membersInfo = []

            for ( let i in memberData){

                const meminfo = await fetch(`https://ctm-backend.vercel.app/api/user/${memberData[i]._id}`,{
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${token}`
                    }
                }
                )

                const meminfodata = await meminfo.json()

                if (meminfo.ok){
                    membersInfo.push(meminfodata)
                }
            }

            return membersInfo
        }

        return null
    }

    return null
}