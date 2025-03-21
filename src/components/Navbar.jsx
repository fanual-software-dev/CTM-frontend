import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Select from "react-select";
import { HiUsers } from "react-icons/hi";   // Heroicons Group Icon
import { AuthHook } from '../contexts/Auth';
import { GroupHook } from '../contexts/GroupContext';




const Navbar = () => {

  const navigate = useNavigate()
  const [slided,setSlided] = useState(0)
  const {dispatch} = AuthHook()
  const [groupID,setGroupID] = useState()
  const user = JSON.parse(localStorage.getItem('user')) 
  const group = JSON.parse(localStorage.getItem('groups'))
  const {groups} = GroupHook()

  console.log(groups,"here are the groups")
  

  useEffect(()=>{
    if (localStorage.getItem('gid')){
      setGroupID(localStorage.getItem('gid'))
    }
    if (groups) localStorage.setItem('groups',JSON.stringify(groups))
  },[groups])
  

  const handleChange = (selected) => {
    setGroupID(selected);
    dispatch({type:'GROUPID_CHANGED',payload:selected})
    localStorage.setItem('gid',selected?.value)
    console.log("Selected value:", selected?.value);
  };
  

  console.log(user)

  const options = groups? groups.map((g)=>({ value: `${g?._id}`, label: <><HiUsers style={{width:'20px',height:'20px'}}/> {g?.name}</> })): group?.map((g)=>({ value: `${g?._id}`, label: <><HiUsers style={{width:'20px',height:'20px'}}/> {g?.name}</> }))
  console.log(options)

  const slider = ()=>{

    if (slided===0){
      
      document.getElementById('navbar').style.left = '0'
      document.getElementById('nav-img').style.transform = 'rotate(180deg)'
      setSlided(1)
    }

    else{
      document.getElementById('navbar').style.left = '-170px'
      setSlided(0)
      document.getElementById('nav-img').style.transform = 'rotate(0deg)'
    }
  }

  const Logout = ()=>{
    localStorage.clear()
    navigate('/')

  }

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#f8f9fa", // Light gray background
      borderColor: "#007bff", // Blue border
      borderRadius: "5px",
      padding: "0px 8px",
      display:"flex",
      alignItems:'center',
      cursor:"pointer",
      boxShadow: "0 0 5px #007bff",
      "&:hover": {
        borderColor: "#0056b3" // Darker blue on hover
      }
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "#007bff" : isFocused ? "#e9ecef" : "#fff",
      color: isSelected ? "#fff" : "#000",
      padding: "5px",
      cursor: "pointer"
    }),
    singleValue: (base) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      color: "rgb(1, 16, 25)",
      fontFamily:'Poppins',
      fontSize:'15px',
      fontWeight:'bold' // Dark gray text
    })
  };

  return (
    <>
        {user && <div className='navbar'>
        <nav>
          <img className='nav-img' id='nav-img' onClick={slider} src="https://cdn-icons-png.flaticon.com/128/8106/8106549.png" alt="" width={20} height={20}/>
          <div className='logo-div'>
            <p>EFOY TASK MANAGER</p>
          </div>
          <Select onChange={handleChange} value={groupID} placeholder="Select Group..." isSearchable={false} options={options} styles={customStyles}  getOptionLabel={(e) => {
             if (e.value!=='undefined'){
              return  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {e.icon} {e.label}
              </div>
             }
              }}/>
          <NavLink to='/home' style={{margin:'30px 0 0 0'}}><img src='https://cdn-icons-png.flaticon.com/128/69/69524.png' alt='Home Logo' /> Home</NavLink>
          <NavLink to='/profile'><img className='profile-image' src={user?.user?.avatar || "https://cdn-icons-png.flaticon.com/128/456/456212.png"} alt='Home Logo' /> <span>Profile</span></NavLink>
          { user?.user?.role === "admin" && <NavLink to='/dashboard'><img src='https://cdn-icons-png.flaticon.com/128/8042/8042206.png' alt='Dashboard Logo'/> Dashboard</NavLink>}
          <NavLink to='/tasks'><img src='https://cdn-icons-png.flaticon.com/128/10888/10888338.png' alt='Home Logo' /> Tasks</NavLink>
          {user?.user.role === 'admin' && <NavLink to={`/create-group/${user?.user._id}`} title='Create group'><img src='https://cdn-icons-png.flaticon.com/128/1769/1769039.png' alt='Home Logo' />Group</NavLink>}

          {user?.user.role === 'admin' && <NavLink to={`/invitation/${user?.user._id}`}><img src='https://cdn-icons-png.flaticon.com/128/10874/10874272.png' alt='Home Logo' /> Invitation</NavLink>}
          {user?.user.role === 'user' && <NavLink to={`/join/group`}><img src='https://cdn-icons-png.flaticon.com/128/10874/10874272.png' alt='Home Logo' /> Join Group</NavLink>}
          {/* <NavLink to='/contact'><img src='https://cdn-icons-png.flaticon.com/128/9674/9674456.png' alt='Home Logo' /> Contact</NavLink> */}
          <NavLink to='/logout' onClick={Logout}><img src='https://cdn-icons-png.flaticon.com/128/10812/10812277.png' alt='Home Logo'/> Logout</NavLink>
        </nav>
      </div>}

      
      {localStorage.getItem('user') && <div id='navbar' className='navbar'>
        <nav>
          <img className='nav-img' id='nav-img' onClick={slider} src="https://cdn-icons-png.flaticon.com/128/8106/8106549.png" alt="" width={20} height={20}/>
          <div className='logo-div'>
            <p>EFOY TASK MANAGER</p>
          </div>
          <Select onChange={handleChange} value={groupID} placeholder="Select Group..." isSearchable={false} options={options} styles={customStyles}  getOptionLabel={(e) => {
             if (e.value!=='undefined'){
              return  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {e.icon} {e.label}
              </div>
             }
              }}/>
          <NavLink to='/home'><img src='https://cdn-icons-png.flaticon.com/128/69/69524.png' alt='Home Logo' /> Home</NavLink>
          <NavLink to='/profile'><img src='https://cdn-icons-png.flaticon.com/128/456/456212.png' alt='Home Logo' /> Profile</NavLink>
          { user?.user?.role === "admin" && <NavLink to='/dashboard'><img src='https://cdn-icons-png.flaticon.com/128/8042/8042206.png' alt='Dashboard Logo'/> Dashboard</NavLink>}
          <NavLink to='/tasks'><img src='https://cdn-icons-png.flaticon.com/128/10888/10888338.png' alt='Home Logo' /> Tasks</NavLink>
          {user?.user.role === 'admin' && <NavLink to={`/create-group/${user?.user._id}`} title='Create group'><img src='https://cdn-icons-png.flaticon.com/128/1769/1769039.png' alt='Home Logo' />Group</NavLink>}
          {user?.user.role === 'admin' && <NavLink to={`/invitation/${user?.user._id}`}><img src='https://cdn-icons-png.flaticon.com/128/10874/10874272.png' alt='Home Logo' /> Invitation</NavLink>}
          {user?.user.role === 'user' && <NavLink to={`/join/group`}><img src='https://cdn-icons-png.flaticon.com/128/10874/10874272.png' alt='Home Logo' /> Join Group</NavLink>}
          {/* <NavLink to='/contact'><img src='https://cdn-icons-png.flaticon.com/128/9674/9674456.png' alt='Home Logo' /> Contact</NavLink> */}
          <NavLink to='/logout' onClick={Logout}><img src='https://cdn-icons-png.flaticon.com/128/10812/10812277.png' alt='Home Logo'/> Logout</NavLink>
        </nav>
      </div>}

    </>
  )
}

export default Navbar
