import React, { useState } from 'react'
import { Info } from "lucide-react";
import { useNavigate } from 'react-router-dom';



const Role = () => {
  const [infoBtn,setInfoBtn] = useState('')
  const [role,setRole] = useState('')
  const [error,setError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = ()=>{
    setError(false)
    if (role){
      navigate(`/signup?role=${role}`)
    }

    setError(true)
  }

  function ResetInfo(){
    document.addEventListener('click',(e)=>{

      if (e.target.id==='admin' || e.target.id==='user' ){
        return
      }

      setInfoBtn('')
     
    })

    window.addEventListener('scroll',()=>{
      if(window.scroll>0){
        setInfoBtn('')
      }
    })
  }

  ResetInfo()
  return (
    <div className='container role'>
      <div className='login-div'>
        <p>WELCOME to EFOY TASK MANAGER</p>
        {/* <p>Helping Lots of Companies By Being Their Number One Choice.</p> */}
        <p>By Joining Us Make Your Task Management Easier!</p>
        <div className='carousel'>

          <p className='carousel-text'>
              <span>Group Collaboration </span>
              Create group and collaborate with your team mates
          </p>

          <p className='carousel-text'>
              <span>Task Management </span>
              Create tasks and assign to your team mates
          </p>

          <p className='carousel-text'>
              <span>Real Time Progress Update  </span>
              See how your team mates are progressing on their assigned tasks
          </p>

          <p className='carousel-text'>
              <span>Team to Team Collaboration  </span>
              Collaborate with other peer teams in some common tasks using premium service.
          </p>

          <p className='carousel-text'>
              <span>Performance Metrics</span>
              Real time performance metrics of your team mates.
          </p>
          </div>
          <button className='call-to-action'>Subscribe to Premium Membership</button>
        </div>

      <div className='roles'>
        
        <p className='register-text'>Welcome, Get Register Here</p>

        <div className='roles-div'>
          <div className='admin' onClick={()=>setRole('admin')} style={role==='admin'?{boxShadow:'0 0 0 red',border:'2px solid yellow'}:{}}>
            <span className='register'>Register as : </span>
            {/* <img src="https://cdn-icons-png.flaticon.com/128/15339/15339256.png" alt="User logo" width={80} height={80}/> */}
            <span>Admin and got admin privilages</span>
            
            <Info id='admin' onClick={()=>setInfoBtn('admin')} width={20} height={20} className='info'/>
            <p className='info-text' style={infoBtn==='admin'?{display:'block'}:{display:'none'}}>Click the whole card to register as an admin</p>
          </div>
          <span>OR</span>
          <div className='user' onClick={()=>setRole('user')} style={role==='user'?{boxShadow:'0 0 0 red',border:'2px solid yellow'}:{}}>
            <span className='register'>Register as : </span>
            <span>User and join organizations</span>
            <Info id='user' onClick={()=>setInfoBtn('user')} width={20} height={20} className='info'/>
            <p className='info-text' style={infoBtn==='user'?{display:'block'}:{display:'none'}}>Click the whole card to register as a user</p>
          </div>
        </div>

        <button onClick={handleSubmit} className='reg-btn'>
          Register
        </button>

        {error && <p className='error'> Choose one card please</p>}
       
      </div>
    </div>
  )
}

export default Role
