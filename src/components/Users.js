import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { setPage } from "../reducer/paginationSlice";
import { getAllUsers } from "../reducer/allUsersSlice";
import { Navbarm } from "./Navbarm";
import { Pagination } from "./Pagination";
import api from "../API/api"
export const Users = () => {

    let users = useSelector((state) => state.allUsers);
    let user = useSelector((state) => state.user);
    const [showPage, setShowPage] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [assigned, setAssigned] = useState(false);
    const [userTo, setUserTo] = useState(null);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPage(1));
        dispatch(getAllUsers()).then((res) => {
                setShowPage(true);
            });
    }, []);

    const Alert = () => {
        return <div style={{ color: "green" }}><h4>Assigned</h4></div>;
    };

    let handleSubmit= async(event,to)=>{
        event.preventDefault();
        let title = event.target[0].value;
        let date = event.target[1].value;
        let desc = event.target[2].value;
        let res = await api.createTask(title,date,desc,to);
        console.log("task assigned",res);
        if(res.data.title){
         setAssigned(true);
        }
    }
  
    let handleClose=()=>{
    setShowModal(false);
    setAssigned(false);
    }

    return (


        <div>
            <Navbarm />
            {/* <div>
                <h2>Users</h2>
            </div>

            {showPage ? (
                users.data.data.map((user) => (
                    <div class="card">
                        <h5 class="card-header">ID: {user.id}</h5>
                        <div class="card-body">
                            <h5 class="card-title">{user.name}   
                            <a onClick={() => {setShowModal(true);setUserTo(user)}} class="btn btn-primary" >Assign Task</a>
                            </h5>
                            <p class="card-text">{user.email}</p>
                        </div>
                    </div>
                ))
            ) : (
                <h2>Loading....</h2>
            )}
            {showPage && <Pagination type="user" last={users.data.last_page} />} */}
        
                

            <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        {/* <div class="col col-lg-9 col-xxl-12"> */}
                            <div class="card rounded-3">
                                <div class="card-body p-4">
                                    <h4 class="text-center my-3 pb-3">Users</h4>
                                    <table class="table mb-4">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">User</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Assign Task</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {showPage ? (
                                                    users.data.data.map((user) => (

                                                            <tr>
                                                                <td>{user.id}</td>
                                                                {/* <th scope="row">{user.id}</th> */}
                                                                <td>{user.name}</td>
                                                                <td>{user.email}</td>
                                                                <td>
                                                                    <button type="submit" class="btn btn-danger" onClick={() => {setShowModal(true);setUserTo(user)}}>Assign</button>
                                                                </td>
                                                            </tr>
                                                    ))

                                                ) : (
                                                        <h1>Loading....</h1>
                                            )}
                                        </tbody>
                                    </table>
                                    {showPage && <Pagination type="user" last={users.data.last_page} />}
                                </div>
                            </div>
                        {/* </div> */}
                    </div>
                </div>
        


            <Modal show={showModal} 
                    onHide={handleClose} 
                    centered={true}
                    >
                <Modal.Header closeButton>
                <Modal.Title>Assign Task To : {userTo && userTo.name}</Modal.Title>
                </Modal.Header>
                <div className="form">
                <form onSubmit={(event)=>{handleSubmit(event,userTo.id)}}>
                    <Modal.Body>
                        <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Due Date" className="form-label">Due Date</label>
                                <input type="datetime-local" className="form-control" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea class="form-control" rows="3"  required ></textarea>
                            </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    {!assigned && <button type="submit" className="btn btn-primary" >Assign</button>}
                    {assigned && <Alert />}
                    </Modal.Footer>
                </form>
                </div>
            </Modal>

        </div>
    );
};