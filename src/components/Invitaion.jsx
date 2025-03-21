import React, { useEffect,useState } from 'react'

const Invitaion = () => {
    const {user,token} = JSON.parse(localStorage.getItem('user'))
    const [group,setGroup] = useState([])
    const [invitee,setInvitee] = useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')

    useEffect(()=>{
        const fetchGroup = async ()=>{

            

            try {
                const response = await fetch(`https://ctm-backend.vercel.app/group/all`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${token}`
                    }
                })
                
                
                
            } catch (error) {
                console.log(error)
            }
        }

        fetchGroup()
    },[])

    const InviteFunc = async (e)=>{
        e.preventDefault()
        setLoading(true)
        setError(false)

        if (!invitee){
            setError('please fill all the required field')
            setLoading(false)
            return
        }
        
        try {
            const response = await fetch(`https://ctm-backend.vercel.app/group/invite`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify({email:invitee,gid:localStorage.getItem('gid')})
            })

            const data = await response.json()

            if (response.ok){
                setLoading(false)
                setError(false)
                setInvitee('')
                setError(data.message)
                
            }

            else{
                setLoading(false)
                setError(data.error)
            }
            
        } catch (error) {
            console.log(error)  }
    }
  return (
    <div className='body-container invitation'>
        <div className='invitation-container'>
          <p className='group-invitation'>Group Invitation - Invite and Boost Your Team</p>
          <form className='invitation-form'>
            <div className='invitation-form-div'>
                <p className='invitation-text'>Hello {user.name}, whom do you want to invite to the group <span>{group?.name}</span>. Please put their email address in the input field.</p>
                <label htmlFor="">Email Address</label>
                <input style={error ? {border:'1px solid rgb(255, 98, 0)'}:{border:'none'}} onChange={(e)=>setInvitee(e.target.value)} value={invitee} type="email" name="email" id="email" placeholder='Type email address of the invitee'/>
                <button onClick={InviteFunc} className='invite-button'>
                    {loading?'Loading...':'Invite'}
                </button>
                {error && <p className='error'>{error}</p>}

            </div>
          </form>
        </div>
    </div>
  )
}

export default Invitaion
