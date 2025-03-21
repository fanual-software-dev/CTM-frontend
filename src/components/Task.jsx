import React, { useEffect, useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { fetchMembers, fetchTasks } from '../functions/FetchFuncs';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { UpdateFunc } from '../functions/EditFuncs';


const Task = ({props}) => {


  const navigate = useNavigate()
  const [assignees,setAssignees] = useState(null) 
  const [visibility,setVisibility] = useState(false)
  const [deleteV,setDeleteV] = useState(false)
  const [priority,setPriority] = useState(props?.priority || '')
  const [title,setTitle] = useState(props?.title || '')
  const [description,setDescription] = useState(props?.description || '')
  const [status,setStatus] = useState(props?.status || '')
  const [assignee,setAssignee] = useState(props?.assignee || '')
  const [dueDate,setDueDate] = useState(props?.dueDate || '')
  const [members,setMembers] = useState(null)
  const {user,token} = JSON.parse(localStorage.getItem('user'))
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const fetchFunc = async ()=>{
        
        const user = await fetch(`https://ctm-backend.vercel.app/api/user/${props.assignee}`,{
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        
        if (user.ok){
            const data = await user.json()
            setAssignees(data)
        }
    }

    fetchFunc()

  },[])

  const fetchfunc = async (id)=>{

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


  const updateFunc = async (e)=>{

    e.preventDefault()
    setLoading(true)

    const data = await UpdateFunc(title,description,assignee,priority,status,dueDate,token,props._id)

   setLoading(false)

    if (data){
        setPriority(data.priority)
        setTitle(data.title)
        setDescription(data.description)
        setStatus(data.status)
        setAssignee(data.assignee)
        window.location.reload()
    }
  }


  const cancelFunc = (e)=>{
      e.preventDefault()
      setVisibility(false)
      
  }

  const deleteFunc = async ()=>{
    setLoading(true)
    const res = await fetch(`http://localhost:4000/api/delete-task/${props._id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Beare ${token}`
        }
    })

    if (res.ok){
        window.location.reload()
        setLoading(false)
    }
  }

  const Priority = ()=>{
      if (props.priority === "Low") return { background: "green", fontWeight: "bold" };
      if (props.priority === "Medium") return { background: "orange", fontWeight: "bold" };
      if (props.priority === "High") return { background: "red", fontWeight: "bold" };
      return {}; // Default style
  
  }

  const Status = ()=>{
      if (props.status === "To Do") return { background: "red", fontWeight: "bold" };
      if (props.status === "In Progress") return { background: "orange", fontWeight: "bold" };
      if (props.status === "Done") return { background: "green", fontWeight: "bold" };
      return {}; // Default image
  }

  


  return (
    <div className='task'>
      <p className='title'>{props.title}</p>
      <p className='description'><span>Description : </span>{props.description}</p>
      {/* <p>Due Date: {formatDistanceToNow(new Date(props.dueDate),{addSuffix:true})}</p> */}
      <p>Created : {formatDistanceToNow(new Date(props.createdAt),{addSuffix:true})}</p>
      <p>Assigned to : {assignees?.name || "Undefined"}</p>
      {props.dueDate && <p>Due Date : {formatDistanceToNow(new Date(props.dueDate),{addSuffix:true})}</p>}
      <div className='status-div'>
        <div style={{display:'flex',alignItems:'center', gap:'20px'}}>
            <p className='priority' title='Priority' style={Priority()}>{props.priority}</p>
            <p className='status' title='Status' style={Status()}>{props.status}</p>
        </div>
        <div className='buttons'>
            <button id='edit' title='edit' onClick={()=>fetchfunc(props._id)} className='edit-btn'><MdEdit/></button>
            { user?.role==='admin'&& <button id='delete' title='delete' onClick={()=>setDeleteV(true)} className='delete-btn'><MdDelete/></button>}
        </div>
      </div>

      {  visibility && <div id='edit-task' className='edit-task'>
        <form className='edit-form' action="">
            <p className='title'>Edit Task</p>
    
           { user?.role==='admin' && <div className='edit-task-div'>
                <label className='label' htmlFor="title">Title</label>
                <input 
                    type="text"
                    placeholder={title || 'Set title'}
                    name='title'
                    id='title'
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)} 
                />
            </div>}
    
            { user?.role==='admin' &&   <div className='edit-task-div'>
                <label className='label' htmlFor="description">Description</label>
                <input 
                    type="text"
                    name='description'
                    id='description'
                    placeholder={description || 'Set description'} 
                    onChange={(e)=>setDescription(e.target.value)}
                    value={description}
                />
            </div>}
    

    
           { user?.role==='admin' && <div className='edit-task-div'>
                <label className='label' htmlFor="priority">Priority</label>
                <select name="priority" id="priority" value={priority} onChange={(e)=>setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>}
    
            { user?.role==='admin' && <div className='edit-task-div'>
                <label className='label' htmlFor="assignee">Assignee</label>
                <select name="assignee" id="assignee" value={assignee} onChange={(e)=>setAssignee(e.target.value)}>
                    {members?.map((mem,id)=>(<option key={id} value={`${mem._id}`}>{mem.name}</option>))}
                </select>
            </div>}

           { user?.role==='user' && <div className='edit-task-div'>
                <label className='label' htmlFor="status">Status</label>
                <select name="status" id="status" value={status} onChange={(e)=>setStatus(e.target.value)}>
                    <option value="Todo">Todo</option>
                    <option value="In progress">In progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>}

            { user.role==='admin' &&  <div className='edit-task-div'>
                      <label className='label' htmlFor="priority">Due Date</label>
                      <input 
                          type="date"
                          name='dueDate'
                          id='dueDate'
                          onChange={(e)=>setDueDate(e.target.value)}
                          value={dueDate}
                      />
                     
                  </div>
            }
    
            <button onClick={(e)=>updateFunc(e)}>{loading?'Saving...':'Save'}</button>
            <button title='close' onClick={(e)=>cancelFunc(e)} className='cancel-btn'><FaTimes/></button>
    
        </form>
        </div>
        }
        
        {
            deleteV && <div id='delete-task' className='delete-task'>
                {/* <div className='delete-icon'>
                    <FaTimes onClick={()=>setDeleteV(false)} className='fa'/>
                </div> */}
                <p>Are you sure you want to delete this task?</p>
                <div>
                    <button onClick={()=>setDeleteV(false)} className='cancel'>Cancel</button>
                    <button onClick={deleteFunc} className='delete'>{loading?'Deleting...':'Delete'}</button>

                </div>
            </div>
        }
    </div>
  )
}

export default Task
