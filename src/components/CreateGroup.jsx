import React, { useState, useSyncExternalStore } from 'react'
import { useParams } from 'react-router-dom'
import { GroupHook } from '../contexts/GroupContext'
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateGroup = () => {

  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [visibility,setVisibility] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)
  const {token} = JSON.parse(localStorage.getItem('user'))
  const {id} = useParams()
  const {groups,dispatch} = GroupHook()

  const CreateGroup = async (e)=>{

    e.preventDefault()

    setError(false)
    setLoading(true)
    

    if (!name){
      setError(true)
      setLoading(false)
      
    }

    try {

      const res = await fetch('https://ctm-backend.vercel.app/group/create',{
        body:JSON.stringify({name,description,visibility,admin:id}),
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }

      })

      const data = await res.json()
      
      if (res.ok){
        setLoading(false)
        setError(false)
        setName('')
        setDescription('')
        setVisibility('')
        dispatch({type:'ADD_GROUP',payload:[data]})
        
        

      }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='body-container' style={{color:"white"}}>
      <div className='group-container'>
        <form className='invitation-form'>
          
          <p className='create'>Create Group</p>
          
          <label className='label' htmlFor="gname">Group Name</label>
          
          <input
           style={{borderRadius:'5px'}} 
           id='gname' 
           type="text" 
           placeholder='Type group name'
           onChange={(e)=>setName(e.target.value)}
           value={name}
          />
          
          <label className='label' htmlFor="">Description</label>
          
          <input 
            style={{borderRadius:'5px'}} 
            id='description' 
            type="text" 
            placeholder='Type group description'
            onChange={(e)=>setDescription(e.target.value)}
            value={description}
          />
          
          <label className='label' htmlFor="">Visibility</label>
          
          <select 
            name="visibility" 
            id="visibility"
            onChange={(e)=>setVisibility(e.target.value)}
            value={visibility}
          >
            <option value="none">Select</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <button onClick={(e)=>CreateGroup(e)}>{loading?"Creating...":'Create Group'}</button>
          
          {error&& <p className='error'>Please fill all the required fields.</p>}

        </form>
      </div>

      <ToastContainer/>
    </div>
  )
}

export default CreateGroup
