import React from 'react';
import { useNavigate } from "react-router-dom";
import api from "../API/api";
import { useSelector } from 'react-redux';

export const PleaseVerifyEmail = () => {

    const navigate = useNavigate(); 
    const Send = async () => {
        await api.resendemail().then(() => {});
    }
    let user = useSelector((state) => state.user);
    const email = user.data.email;
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
