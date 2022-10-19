import './App.css';
import React, { Component }  from 'react';
import {Home} from './components/Home';
import {Login} from "./components/Login";
import { Register } from './components/Register';
import {Dashboard} from './components/Dashboard';
import { EmailVerification } from "./components/EmailVerification";
import { PleaseVerifyEmail } from "./components/PleaseVerifyEmail";
import { ResetPassword } from "./components/ResetPassword";
import { Route, Routes, BrowserRouter } from "react-router-dom";




function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route   path="/login" element={<Login/>}/>
      <Route   path="/register" element={<Register/>}/>
      <Route   path="/" element={<Home/>}/>
      <Route   path="/email/verify" element={<EmailVerification />} />
      <Route   path="/dashboard" element={<Dashboard />} />
      <Route   path="/pleaseverifyemail" element={<PleaseVerifyEmail />} />
      <Route   path="/password/reset" element={<ResetPassword/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
