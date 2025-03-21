import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleLogIN from './GoogleLogIN'
import { AuthHook } from '../contexts/Auth'
import { Groupfetch } from '../functions/GroupFuncs'
import { GroupHook } from '../contexts/GroupContext'

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [google,setGoogle] = useState(false)
    const {dispatch} = GroupHook()
    const navigate = useNavigate()
    const User = localStorage.getItem('user')

    useEffect(()=>{
        const clearfunc = ()=>{
            if (localStorage.getItem('user')){
                navigate('/home')
            }
           
            
        }
    
        clearfunc()
    },[])

    const Loginfunc = async (e)=>{

        e.preventDefault()
        setLoading(true)
        setError(false)

        const User = await fetch('https://ctm-backend.vercel.app/login',{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }

        })

        const data = await User.json()
        localStorage.clear()
        
        if (User.ok){

            localStorage.setItem('user',JSON.stringify(data))
            const checker = await Groupfetch()
            if (checker){
                localStorage.setItem('groups',JSON.stringify(checker))
                navigate('/home')
                setEmail('')
                setPassword('')
                setLoading(false)
                setError(false)
                dispatch({type:'GET_GROUPS',payload:checker})
        
                return
            }
            
            setLoading(false)
            setError(true)
        }

        setLoading(false)
        setError(true)


        
    }
  return (
       <>
       {  !User &&  <div className='container login'>

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
      <div className='login-form'>
          <form onSubmit={Loginfunc}>
            <GoogleLogIN></GoogleLogIN>
          
            <div className='input-div'>
                <img className='img' src="https://cdn-icons-png.flaticon.com/128/456/456212.png" alt="Username" width={25} height={25}/>
                <input
                    type="email"
                    placeholder='Enter email address'
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                />
            </div>
          
            <div className='input-div'>
                <img className='img' src="https://cdn-icons-png.flaticon.com/128/10421/10421121.png" alt="Username" width={25} height={25}/>
                <input
                    type="password"
                    placeholder='Enter password'
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                />
            </div>
            <div className='btn-div'>
                <button disabled={loading}>{loading?"Logging In":'Log In'}</button>
            </div>
            <p className='signup-text'>Don't have an account yet ? <span onClick={()=>navigate('/role')}>Sign up here</span></p>
            <p className='error'>{error && "Invalid credentials. Check username or password."}</p>
          </form>
      </div>
    </div>}
       </>
  )
}

export default Login
