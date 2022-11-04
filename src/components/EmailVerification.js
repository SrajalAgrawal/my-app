import React from 'react';
import { useEffect } from "react";
import api from "../API/api";
import { useNavigate } from "react-router";

export const EmailVerification = () => {
    
    const Token = new URL(window.location.href);
    const token = Token.searchParams.get("token");
    let navigate =useNavigate();
    useEffect(()=>{ Verify(); },[])
   
    let Verify = async()=>{
        await api.verifyEmail(token);
        navigate("/Dashboard/profile", { replace: true });
    }
  return (
    <div>
     Verifiying Email......
    </div>
  )
  }