import React, { useRef } from "react";
import api from "../API/api";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export const Login = () => {
  const captchaRef = useRef(null);
  const navigate = useNavigate();
  const Login = async (event) => {
    event.preventDefault();
    // const token = captchaRef.current.getValue();
    // captchaRef.current.reset();

    // api.gcaptcha(token).then((res) => {
    //   if (res.data.success) {
        api.login(event).then((res) => {
          if (res && res.data.access_token && res.data.user.email_verified_at) {
            console.log("1");
            navigate("/dashboard", { replace: true });
          }
          else if (res && res.data.access_token) {
            console.log("2");
            navigate("/pleaseverifyemail", { replace: true });
          }
          else{
            console.log("3");
          }
        });
    //   }
    // });
  };

  return (
    <div className="form">
      <form onSubmit={Login}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>
        {/* <div><ReCAPTCHA
              sitekey="6LfeJfAhAAAAAFYM59JLNsh0tzy_M3qdpapLTGU-"
              ref={captchaRef}
        /></div> */}
        <button type="submit" className="btn btn-primary" >Login</button>
        <div>
          <button onClick={() => {
            navigate("/Register", { replace: true });
          }} className="btn btn-primary" >Don't have Account / Register</button>
        </div>
      </form>
    </div>
  );
};