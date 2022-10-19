import React, { useRef } from "react";
import api from "../API/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const ResetPassword = () => {
    const navigate = useNavigate();
    const [match,setmatch] = useState(false);

    const reset = async(event)=>{
        event.preventDefault();
        const urlToken = new URL (window.location.href);
        const token = urlToken.searchParams.get('token');
        const email = urlToken.searchParams.get('email');
    
        if (event.target[0].value !== event.target[1].value) {
            setmatch(true);
            return;
        } else {
            setmatch(false);
        }

        let password = event.target[0].value;
        let password_confirm = event.target[1].value;
        let res = await api.resetPassword(email,password,password_confirm,token);
        if (res) {
            navigate("/Dashboard", { replace: true });
        }
    };

    const Alert = (props) => {
        return <div style={{ color: "red" }}>Password Did Not Match</div>;
    };

  return (
    <div>
        Email : {JSON.parse(localStorage.getItem("user")).user.email}
        <div className="form">
        <form onSubmit={reset}>
            <div className="mb-3">
            <label htmlFor="password" className="form-label">New Password</label>
            <input type="password" className="form-control" id="password" />
            </div>
            <div className="mb-3">
            <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="password_confirmation" />
            </div>
            {match && <Alert />}
            <button type="submit" className="btn btn-primary" >Reset Password</button>
        </form>
        </div>
    </div>
  );
}