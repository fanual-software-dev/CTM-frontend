import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { GroupHook } from '../contexts/GroupContext'

const Join = () => {
  const [searchParams] = useSearchParams()
  const {user,token} = JSON.parse(localStorage.getItem('user'))
  const ID = searchParams.get('id')
  const [inviteId,setInviteId] = useState(ID||'')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const {dispatch} = GroupHook()

  const InviteFunc = async (e)=>{
    e.preventDefault()
    setLoading(true)
    setError(false)

    if (!inviteId){
        setError('please fill all the required field')
        setLoading(false)
        return
    }
    
    try {
        const response = await fetch(`https://ctm-backend.vercel.app/group/add/${inviteId}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        })

        const data = await response.json()

        if (response.ok){
            setLoading(false)
            setError(false)
            setInviteId('')
            dispatch({type:'ADD_GROUP',payload:data})
            
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
        <p className='group-invitation'>Join Group</p>
        <form className='invitation-form'>
          <div className='invitation-form-div'>
              <p className='invitation-text'>Hello {user.name}, Join a team by using their invite id</p>
              <label htmlFor="">{ID ? "Click the join button below to join the team": "Invite ID"}</label>
              { !ID && <input style={error ? {border:'1px solid rgb(255, 98, 0)'}:{border:'none'}} onChange={(e)=>setInviteId(e.target.value)} value={inviteId} type="text" name="text" id="text" placeholder='Type the invite id here'/>}
              <button onClick={InviteFunc} className='invite-button'>
                  {loading?'Loading...':'Join'}
              </button>
              {error && <p className='error'>{error}</p>}

          </div>
        </form>
      </div>
  </div>
  )
}

export default Join
