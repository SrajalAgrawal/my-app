import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Button, Offcanvas } from "react-bootstrap";
import userSlice from "../reducer/userSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbarm } from "./Navbarm";
import moment from "moment";
import { Analytics } from './Analytics';

export const Profile = () => {

    // const navigate = useNavigate();
    let dispatch = useDispatch();
    let user = useSelector((state) => state.user);
    //console.log(user.data.email); 
    return (
        <div>
            <Navbarm />
            <div className="container-custom">
                <h2>Profile</h2>
                <Card>
                <div className="float">
                    <div className="item"> UserID : {user.data.id}</div>
                </div>
                <div className="float">
                    <div className="item">Name : {user.data.name}</div>
                </div>
                <div className="float">
                    <div className="item">Email : {user.data.email}</div>
                </div>
                <div className="float">
                    <div className="item">Admin : {user.data.role? "Yes" : "No"}</div>
                </div>
                <div className="float">
                    <div className="item">Account created at : {moment(moment.utc(user.data.created_at).toDate()).format("YYYY-MM-DD")}
                    </div>
                </div>
                <div className="float">
                    <div className="item">Email verified at : {moment(moment.utc(user.data.email_verified_at).toDate()).format("YYYY-MM-DD")}
                    </div>
                </div>
                </Card>
            </div>
            <Analytics/>
        </div>
    );
};