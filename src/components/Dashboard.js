import React from 'react'
import api from "../API/api";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    // let dispatch = useDispatch();
    const navigate = useNavigate(); 
    const Reset = async () => {
        await api.resetpasswordrequest().then((res) => {
              navigate("/pleaseverifyemail", { replace: true });
        });
    }

  return (
    <div>
      Dashboards
      <div>
    <button onClick={() => {
        navigate("/Login", { replace: true });
    }} className="btn btn-primary" >Already have Account / Login</button>
    </div>
    <div>
        <button onClick={
            Reset
        } className="btn btn-primary" >Reset Password</button>
    </div>
    </div>
    
  )
}

