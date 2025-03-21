import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import axios from 'axios'

const Profile = () => {
    const {user,token} = JSON.parse(localStorage.getItem('user'))
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [newpass,setNewPassword] = useState('')
    // const [role,setRole] = useState('')
    const [confirm,setConfirm] = useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [matched,setMatched] = useState(false)
    // const [avatar,setavatar] = useState('')
    const [file,setFile] = useState('')

    const ImageEXt = (e)=>{
        const imge = e.target.files[0]

        if (imge){
            setFile(imge)
            console.log("here us file",file)
        }
        
    }

    const Loginfunc = async (e)=>{

        e.preventDefault()
        setLoading(true)
        setError(false)
        setMatched(false)
        
        if ( (name || email || newpass || password || confirm || file) && (newpass===confirm)){
            
            let updated = {}

            const formdata = new FormData()

            formdata.append('file',file)
            formdata.append('upload_preset', 'docuploads')
  
            let result = ""
  
            if (file){
              result = await axios.post(`https://api.cloudinary.com/v1_1/dmzvqehan/upload`,formdata)
            }
  
            let imgpath = ''
  
            if (result && result.statusText==="OK"){
              imgpath = result.data.secure_url
            }

            const comparator = {name,email,newpass,password,confirm,avatar:imgpath}

            for (let element in comparator){
                if (comparator[element]){
                    updated[element] = comparator[element]
                }
            }
            const User = await fetch('https://ctm-backend.vercel.app/api/edit-user',{
                method:"PATCH",
                body:JSON.stringify(updated),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }
    
            })
    
            
            if (User.ok){
                const data = await User.json()
                // localStorage.setItem('user',JSON.stringify(data))
                setEmail('')
                setPassword('')
                setNewPassword('')
                setConfirm('')
                setLoading(false)
                setError(false)
                setMatched(false)
                setName('')
                console.log("here is the user ",user)
                return
            }

            console.log(User)

            setLoading(false)
            setMatched(false)
            setError(true)
        }

        setLoading(false)
        setError(false)
        setMatched(true)

        


        
    }
  return (
    <div className='body-container'>
        <div className='profile-div'>
          <div className='background'>
            <img className='profile-picture' src={user?.avatar || "https://cdn-icons-png.flaticon.com/128/1077/1077012.png"} alt="Profile picture"/>
            <div className='profile-info'>
              <p className='profile-text hidden'>UID : {user?._id} </p>
              <p className='profile-text'><span className='hidden'>Full Name :</span> {user?.name} </p>
              <p className='profile-text'><span className='hidden'>Role :</span> {user?.role} </p>
              <label className='avatar' htmlFor="avatar"><FiEdit className='avatar-edit'/></label>
              <input id='avatar' type="file" accept='image/*' onChange={ImageEXt}/>
              {/* <p title='Email' className='profile-text'>{user?.email}. </p> */}
            </div>
          </div>

          <div className='edit-profile'>
            <p className='edit-profile-txt'><FaEdit/>Edit Personal Information</p>

            <form className='form' onSubmit={Loginfunc}>

              <div className='form-div1'>
                  <div className='form-div'>
                      <label htmlFor="">Full name</label>
                      <img className='img' src="https://cdn-icons-png.flaticon.com/128/456/456212.png" alt="Username" width={25} height={25}/>
                      <input
                          type="text"
                          placeholder={user?.name || 'Enter name' }
                          onChange={(e)=>setName(e.target.value)}
                          value={ name}
                      />
                  </div>
                  <div className='form-div'>
                      <label htmlFor="">Email address</label>
                      <img className='img' src="https://cdn-icons-png.flaticon.com/128/16935/16935745.png" alt="Username" width={25} height={25}/>
                      <input
                          type="email"
                          placeholder={user?.email || 'Enter email address'}
                          onChange={(e)=>setEmail(e.target.value)}
                          value={email}
                      />
                  </div>
              </div>

              <div className='form-div1'>
                    <div className='form-div'>
                      <label htmlFor="">Old password</label>
                      <img className='img' src="https://cdn-icons-png.flaticon.com/128/10421/10421121.png" alt="Username" width={25} height={25}/>
                      <input
                          type="password"
                          placeholder='Enter old password'
                          onChange={(e)=>setPassword(e.target.value)}
                          value={password}
                      />
                    </div>
                    <div className='form-div'>
                      <label htmlFor="">New password</label>
                      <img className='img' src="https://cdn-icons-png.flaticon.com/128/10421/10421121.png" alt="Username" width={25} height={25}/>
                      <input
                          type="password"
                          placeholder='Enter new password'
                          onChange={(e)=>setNewPassword(e.target.value)}
                          value={newpass}
                      />
                    </div>
                </div>

                <div className='form-div'>
                   <label htmlFor="">Confirm password</label>
                   <img className='img' src="https://cdn-icons-png.flaticon.com/128/10421/10421121.png" alt="Username" width={25} height={25}/>
                   <input
                       type="password"
                       placeholder='Confirm password'
                       onChange={(e)=>setConfirm(e.target.value)}
                       value={confirm}
                   />
               </div>
               <div className='btn-div'>
                  <button className='save-btn' disabled={loading}>{loading?"SAVING":'SAVE'}</button>
               </div>

               {error && <p className='error'>Edit unsuccessful. Please check all the information you filled</p>}
               {matched && <p className='error'>Password not matched. Please check the new password and the confirm password.</p>}

            </form>
          </div>
            
        </div>
    </div>
  )
}

export default Profile
