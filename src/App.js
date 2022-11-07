import './App.css';
import React  from 'react';
import {Home} from './components/Home';
import {Login} from "./components/Login";
import { Register } from './components/Register';
import { EmailVerification } from "./components/EmailVerification";
import { PleaseVerifyEmail } from "./components/PleaseVerifyEmail";
import { ResetPassword } from "./components/ResetPassword";
import { Profile } from "./components/Profile";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Users } from './components/Users';
import { Tasks } from "./components/Tasks";




function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route   path="/login" element={<Login/>}/>
      <Route   path="/register" element={<Register/>}/>
      <Route   path="/" element={<Home/>}/>
      <Route   path="/email/verify" element={<EmailVerification />} />
      <Route   path="/pleaseverifyemail" element={<PleaseVerifyEmail />} />
      <Route   path="/password/reset" element={<ResetPassword/>} />
      <Route   exact path="/dashboard/profile" element={<Profile />} />
      <Route   exact path="/dashboard/users" element={<Users />} />
      <Route exact path="/dashboard/tasks" element={<Tasks />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
