import React from 'react';
import { useNavigate } from "react-router-dom";
import api from "../API/api";

export const PleaseVerifyEmail = () => {

    const navigate = useNavigate(); 
    const Send = async () => {
        // event.preventDefault();
        await api.resendemail().then((res) => {
            // if (res && res.data.access_token && res.data.user.email_verified_at) {
            //   console.log("1");
            //   navigate("/dashboard", { replace: true });
            // }
        });
    }


    return (
        <div>
            Please Check Your Email for Email-Verification.
            <div>
                <button onClick={() => {
                    navigate("/Login", { replace: true });
                }} className="btn btn-primary" >Already Verified / Login</button>
            </div>
            <div>
                <button onClick={
                    Send
                } className="btn btn-primary" >Resend Email-Verification</button>
            </div>
        </div>
    )
}

