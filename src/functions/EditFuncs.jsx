export const UpdateFunc = async(title,description,assignee,priority,status,dueDate,token,id)=>{
    console.log(title,description,"here is the assignee",assignee,priority,status)
    const bodyinfo =  {title,description,priority,status,dueDate,gid:localStorage.getItem('gid')}
    if (assignee){
        bodyinfo['assignee'] = assignee
    }
    

    const res = await fetch(`https://ctm-backend.vercel.app/api/update-task/${id}`,{
        body:JSON.stringify(bodyinfo),
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    })

    if (res.ok){
        
        const updated = await res.json()
        
        return updated 
    }

    const data = res.json()

    console.log(data)

    return null


}