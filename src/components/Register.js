import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../API/api";
import { Card } from "react-bootstrap";

export const Register = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("user")){
          navigate("/dashboard/profile", { replace: true });
        }
    },[]);

    const Register = async (event) => {
        event.preventDefault();
        let res = await api.register(event);
        if (res.data) {
        navigate("/pleaseverifyemail", { replace: true });
        }        
    };
    
    return (
        <Card style={{ width: '25rem' }} >
            <h2>Register</h2>
            <div className="form">
                <form onSubmit={Register}>
                <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary" >Register</button>
                    <div>
                    <button onClick={() => {
                        navigate("/Login", { replace: true });
                    }} className="btn btn-primary" >Already have Account / Login</button>
                    </div>
                </form>
            </div>
        </Card>
    )
}

