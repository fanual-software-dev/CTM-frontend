import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Groupfetch } from "../functions/GroupFuncs";


const clientId = "323935900212-9rs6e1q8abv6mp51aiaeahqvptfe2r5v.apps.googleusercontent.com" // Replace with your Client ID

const GoogleSignUp = () => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const role = searchParams.get('role')

  const handleSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    setUser(decoded);

    const res = await fetch('https://ctm-backend.vercel.app/google/signup',{
      method:'POST',
      body:JSON.stringify({name:decoded.name, email:decoded.email,role}),
      headers:{
        'Content-Type':'application/json'
      }

    })

    if (res.ok){
      
      const data = await res.json()
      localStorage.setItem('user',JSON.stringify(data))
      const checker = await Groupfetch()
      if (checker){
        localStorage.setItem('groups',JSON.stringify(checker))
        navigate('/home')
        return
      }
      
      

    }

    const data = await res.json()
    console.log(data)

    console.log("User:", decoded,decoded.email,decoded);
  };

  const handleFailure = () => {
    console.log("Google login failed");
  };



  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        {
          <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
        }
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleSignUp;



