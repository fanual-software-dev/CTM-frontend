import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { FaTimes } from "react-icons/fa";
import { AuthHook } from '../contexts/Auth';
import { fetchMembers, fetchTasks } from '../functions/FetchFuncs';

const EditTask = ({property:{id,visibility}}) => {

    const [task,setTask] = useState(null)
    const [priority,setPriority] = useState(task?.priority || '')
    const [title,setTitle] = useState(task?.title || '')
    const [description,setDescription] = useState(task?.description || '')
    const [status,setStatus] = useState(task?.status || '')
    const [assignee,setAssignee] = useState(task?.assignee || '')
    const [dueDate,setDueDate] = useState(task?.dueDate || '')
    const [members,setMembers] = useState(null)
    const {user,token} = JSON.parse(localStorage.getItem('user'))
    const [visible,setVisible] = useState(visibility)
    const navigate = useNavigate()
  

    useEffect(()=>{

        const fetchfunc = async()=>{
            
           try {

            console.log("here is the ID",id)

            const data = await fetchTasks(id,token)
            
            setPriority(data.priority)
            setTitle(data.title)
            setDescription(data.description)
            setStatus(data.status)

            const members = await fetchMembers(user.role,token)
            

            setMembers(members)

            console.log( "Here are the fetched datas and members",data,members)
            
            

           } catch (error) {
            console.log(error)
           } 
        }

        fetchfunc();
    },[])


    const cancelFunc = (e)=>{
        e.preventDefault()
        setVisible(false)
        navigate('/tasks')
    }

  return (
        <>
            {  visible && <div id='edit-task' className='edit-task'>
                <form className='edit-form' action="">
                    <p className='title'>Edit Task</p>
            
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
                        <label className='label' htmlFor="status">Status</label>
                        <select name="status" id="status" value={status} onChange={(e)=>setStatus(e.target.value)}>
                            <option value="Todo">Todo</option>
                            <option value="In progress">In progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
            
                    <div className='edit-task-div'>
                        <label className='label' htmlFor="priority">Priority</label>
                        <select name="priority" id="priority" value={priority} onChange={(e)=>setPriority(e.target.value)}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
            
                    <div className='edit-task-div'>
                        <label className='label' htmlFor="assignee">Assignee</label>
                        <select name="assignee" id="assignee" value={assignee} onChange={(e)=>setAssignee(e.target.value)}>
                            {members?.map((mem,id)=>(<option key={id} value={mem._id}>{mem.name}</option>))}
                        </select>
                    </div>
            
                    <button>Save Changes</button>
                    <button title='close' onClick={(e)=>cancelFunc(e)} className='cancel-btn'><FaTimes/></button>
            
                </form>
                </div>
            }
        </>
    
  )
}

export default EditTask
