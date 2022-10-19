import React from 'react';
import { useNavigate } from "react-router-dom";


export const Home = () => {
    const navigate = useNavigate();


    return (
        <div>
            home
            <div>
                <button onClick={() => {
                    navigate("/Login", { replace: true });
                }} className="btn btn-primary" >Login</button>
            </div><div>
                <button onClick={() => {
                    navigate("/Register", { replace: true });
                }} className="btn btn-primary" >Don't have Account / Register</button>
            </div>
        </div>
    )
}

