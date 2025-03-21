import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import Tasks from "./components/Tasks"
import Navbar from "./components/Navbar"
import GoogleLogIN from "./components/GoogleLogIN"
import Profile from "./components/Profile"
import Contact from "./components/Contact"
import Dashboard from "./components/Dashboard"
import Invitaion from "./components/Invitaion"
import SignUp from "./components/Signup"
import CreateGroup from "./components/CreateGroup"
import Join from "./components/Join"
import Role from "./components/Role"

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/tasks" element={<Tasks/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/logout" element={<Login/>}></Route>
        <Route path="/task/edit/:id" element={<Tasks/>}></Route>
        <Route path="/auth/google" element={<GoogleLogIN/>}></Route>
        <Route path="/join/group" element={<Join/>}></Route>
        <Route path="/invitation/:id" element={<Invitaion/>}></Route>
        <Route path="/create-group/:id" element={<CreateGroup/>}></Route>
        <Route path="/role" element={<Role/>}></Route>
      </Routes>
    </>
  )
}

export default App
