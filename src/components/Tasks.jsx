import React, { useEffect, useState } from 'react'
import Task from './Task'
import { MdAdd } from "react-icons/md";
import { AuthHook } from '../contexts/Auth';
import EmptyTask from './EmptyTask';
import { FaTimes } from 'react-icons/fa';
import { fetchMembers } from '../functions/FetchFuncs';

const Tasks = () => {
  const {token,user} = JSON.parse(localStorage.getItem('user'))
  const [task,setTask] = useState(null)
  const [empty,setEmpty] = useState(false)
  const [visibility,setVisibility] = useState(false)
  const {gid} = AuthHook()
  const [priority,setPriority] = useState('')
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [assignee,setAssignee] = useState('')
  const [dueDate,setDueDate] = useState('')
  const [members,setMembers] = useState(null)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)
  
  useEffect(()=>{
    const fetchfunc = async ()=>{

      setEmpty(false)
      

      try {
        const res = await fetch("https://ctm-backend.vercel.app/api/tasks",{
          body:JSON.stringify({gid:localStorage.getItem('gid')}),
          method:"POST",
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          }
        })

        if (res.ok){
          const data = await res.json()
          setTask(data)
          if (data.length===0){
            setEmpty(true)
          }
        }

      } catch (error) {
        console.log(error)
      }


      
    }
    
    fetchfunc();

  },[gid])

  const fetchfunc = async ()=>{

    setVisibility(true)
          
    try {
    //  console.log("here is the ID",id)
     const members = await fetchMembers(user.role,token)
     
     setMembers(members)
     
    //  console.log( "Here are the fetched datas and members",data,members)
     
     
    } catch (error) {
     console.log(error)
    } 
  }


  const cancelFunc = (e)=>{
    e.preventDefault()
    setVisibility(false)
    
  }

  const CreateTask = async (e)=>{
    e.preventDefault()
    setError(false)
    setLoading(true)

    console.log(title,description,priority,assignee)

    if (!title || !description || !priority || !assignee){
      setError(true)
      setLoading(false)
      return
    }

    try {
      const res = await fetch('http://localhost:4000/api/create-task',{
        method:'POST',
        body:JSON.stringify({title,description,priority,assignee,dueDate}),
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        }
      })
      
      if (res.ok){
        setError(false)
        setLoading(false)
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='body-container tasks'>
      <p className='task-title'>Tasks you have in your list {user?.role==='admin'&&<MdAdd onClick={fetchfunc} title='ADD NEW TASKS' style={{background:"white",color:'black',borderRadius:'5px',cursor:'pointer',position:'absolute',right:'10px'}}/>}</p>
      {task?.map((element,id)=>(<Task props={element} key={id}/>))}
      {empty && <EmptyTask/>}

      {visibility && <div id='edit-task' className='edit-task'>
              <form className='edit-form' action="">
                  <p className='title'>Create Task</p>
          
                 <div className='edit-task-div'>
                      <label className='label' htmlFor="title">Title</label>
                      <input 
                          type="text"
                          placeholder={title || 'Set title'}
                          name='title'
                          id='title'
                          value={title}
                          onChange={(e)=>setTitle(e.target.value)} 
                      />
                  </div>
          
                  <div className='edit-task-div'>
                      <label className='label' htmlFor="description">Description</label>
                      <input 
                          type="text"
                          name='description'
                          id='description'
                          placeholder={description || 'Set description'} 
                          onChange={(e)=>setDescription(e.target.value)}
                          value={description}
                      />
                  </div>
          
      
          
                 <div className='edit-task-div'>
                      <label className='label' htmlFor="priority">Priority</label>
                      <select name="priority" id="priority" value={priority} onChange={(e)=>setPriority(e.target.value)}>
                          <option value="">Select</option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                      </select>
                  </div>
          
                  <div className='edit-task-div'>
                      <label className='label' htmlFor="assignee">Assignee</label>
                      <select name="assignee" id="assignee" value={assignee} onChange={(e)=>setAssignee(e.target.value)}>
                          <option value="">Select</option>
                          {members?.map((mem,id)=>(<option key={id} value={`${mem._id}`}>{mem.name}</option>))}
                      </select>
                  </div>

                  <div className='edit-task-div'>
                      <label className='label' htmlFor="priority">Due Date</label>
                      <input 
                          type="date"
                          name='dueDate'
                          id='dueDate'
                          onChange={(e)=>setDueDate(e.target.value)}
                          value={dueDate}
                      />
                     
                  </div>

          
                  <button onClick={(e)=>CreateTask(e)}>{loading?'Creating...':'Create'}</button>
                  <button title='close' onClick={(e)=>cancelFunc(e)} className='cancel-btn'><FaTimes/></button>
                  {error && <p className='error'>Please fill all the required fields</p>}
          
              </form>
        </div>}
    </div>
  )
}

export default Tasks
