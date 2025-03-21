import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import GoogleLogIN from './GoogleLogIN'
import { AuthHook } from '../contexts/Auth'
import { Groupfetch } from '../functions/GroupFuncs'
import GoogleSignUp from './GoogleSignUp'

const SignUp = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const {user,dispatch} = AuthHook()
    const [searchParams] = useSearchParams()
    const role = searchParams.get('role')
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

    const Signupfunc = async (e)=>{

        e.preventDefault()
        setLoading(true)
        setError(false)

        const User = await fetch('https://ctm-backend.vercel.app/signup',{
            method:"POST",
            body:JSON.stringify({name,email,password,role}),
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
                setName('')
                setEmail('')
                setPassword('')
                setLoading(false)
                setError(false)
                
                console.log("here is the user ",user)
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
       {  !User &&  <div className='container'>

      <div className='signup-form'>
          <form onSubmit={Signupfunc}>
            <GoogleSignUp/>
            <div className='input-div'>
                <img className='img' src="https://cdn-icons-png.flaticon.com/128/456/456212.png" alt="Username" width={25} height={25}/>
                <input
                    type="text"
                    placeholder='Enter full name'
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                />
            </div>
          
            <div className='input-div'>
                <img className='img' src="https://cdn-icons-png.flaticon.com/128/2099/2099199.png" alt="Username" width={25} height={25}/>
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
                <button disabled={loading}>{loading?"Signing Up":'Sign Up'}</button>
            </div>
            <p className='signup-text'>Already have an account ? <span onClick={()=>navigate('/')}>Login here</span></p>
            <p className='error'>{error && "Please fill the required filleds. Check username or password."}</p>
          </form>
      </div>
    </div>}
       </>
  )
}

export default SignUp

