import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Groupfetch } from "../functions/GroupFuncs";

const clientId = "323935900212-9rs6e1q8abv6mp51aiaeahqvptfe2r5v.apps.googleusercontent.com" // Replace with your Client ID

const GoogleLogIN = () => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  const handleSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    setUser(decoded);

    const res = await fetch('https://ctm-backend.vercel.app/google/login',{
      method:'POST',
      body:JSON.stringify({email:decoded.email}),
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
      }
      
      

    }

    console.log("User:", decoded,decoded.email,typeof(decoded));
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

export default GoogleLogIN;



