import React, { useEffect } from "react";
import { Dropdown, DropdownButton, Button, NavDropdown} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import api from "../API/api";
import { useState } from "react";
import { getTasks } from "../reducer/taskSlice";
import { getAllTasks } from "../reducer/allTasksSlice";
import { setPage } from "../reducer/paginationSlice";
import { Navbarm } from "./Navbarm";
import { Pagination } from "./Pagination";
import moment from "moment";
import { setSort } from "../reducer/searchSlice";

export const Tasks = () => {

    let tasks = useSelector((state) => state.task);
    let sea = useSelector((state) => state.search);
    let paginator = useSelector((state) => state.paginator);
    let dispatch = useDispatch();

    const [showPage, setShowPage] = useState(false);
    //   const [total, setTotal] = useState(0);

    // const [searchParam] = useState(["title", "desc", "status","assigned_to_name","assigned_by_name"]);

    useEffect(() => {
        dispatch(setPage(1));
        dispatch(getTasks(paginator.page))
            .then((res) => {
                setShowPage(true);
            });
        console.log("tasks", paginator.page);
    }, []);

    let progress = async (stat, task) => {
        if (task.status !== stat) {
            await api.changeStatus(task, stat);
            dispatch(getTasks());
        }
    };

    let handleSort = (sort) => {
        dispatch(setSort(sort));
        dispatch(getTasks());
        // dispatch(setSort(sort));
        dispatch(setPage(1));
    };
    let handleBulk = async(stat) => {
        checkedState.map((check) => {
            console.log("hurray",check);
          });
          await api.changeTaskStatusBulk(checkedState, stat);
            dispatch(getTasks())
    };


      const [checkedState, setCheckedState] = useState([]);
    //   const [showBulk, setShowBulk] = useState(false);

    let handleCheck = (event) => {
        let id = event.target.id;
        console.log("0",id);
        setCheckedState((checkedState) => [...checkedState, id]);

        // if (checkedState.includes(id)) {
        //   let copy = [...checkedState];
        //   var index = copy.indexOf(event.target.id);
        //   copy.splice(index, 1);
        //   setCheckedState((checkedState) => copy);
        //   console.log(checkedState);
        //   console.log("1",id);
    
        //   if (checkedState.length == 1) {
        //     setShowBulk(false);
        //   }
        // } else {
        //   setCheckedState((checkedState) => [...checkedState, id]);
        // console.log("2",id);

        //   setShowBulk(true);
        // }
      };

    return (
        <div>
            <Navbarm />
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        {/* <div class="col col-lg-9 col-xxl-12"> */}
                            <div class="card rounded-3">
                                <div class="card-body p-4">

                                    <h4 class="text-center my-3 pb-3">Task To Do</h4>

                                    <div style={{ display: "flex" }}>
                                        <div style={{ width: "100%" }}>
                                            <DropdownButton id="dropdown-basic-button" title="Bulk Action">
                                                <Dropdown.Item onClick={() => {handleBulk("InProgress");}}>InProgress</Dropdown.Item>
                                                <Dropdown.Item onClick={() => {handleBulk("Completed");}} >Finished</Dropdown.Item>
                                            </DropdownButton>
                                        </div>
                                    
                                        <DropdownButton id="dropdown-basic-button" title={sea.sort}>
                                            <Dropdown.Item onClick={() => {handleSort("Title");}}>Title</Dropdown.Item>
                                            <Dropdown.Item onClick={() => {handleSort("Due Date");}} >Due Date</Dropdown.Item>
                                            <Dropdown.Item onClick={() => {handleSort("Assigned By");}} >Assigned By</Dropdown.Item>
                                            <Dropdown.Item onClick={() => {handleSort("Assigned To");}}>Assigned To</Dropdown.Item>
                                            <Dropdown.Item onClick={() => {handleSort("Status");}} >Status</Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                   
                                    
                                    <table class="table mb-4">
                                        <thead>
                                            <tr>
                                                {/* <th scope="col">No.</th> */}
                                                <th scope="col"></th>
                                                <th scope="col">Task</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Assigned To</th>
                                                <th scope="col">Assigned By</th>
                                                <th scope="col">Deadline</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {showPage ? (
                                                    tasks.data.data.map((task) => (

                                                            <tr>
                                                                {/* <th scope="row">1</th> */}
                                                                <td>
                                                                    <div style={{ marginRight: "10px" }}>
                                                                        <input
                                                                            style={{ width: "18px", height: "18px" }}
                                                                            id={task.id}
                                                                            type="checkbox"
                                                                            onChange={(event) => {handleCheck(event);}}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td>{task.title}</td>
                                                                <td>{task.desc}</td>
                                                                <td>{task.assigned_to_name}</td>
                                                                <td>{task.assigned_by_name}</td>
                                                                <td><b>{moment(moment.utc(task.due_date).toDate()).format( "YYYY-MM-DD HH:mm:ss")}</b></td>
                                                                <td>{task.status}</td>
                                                                <td>
                                                                    <button type="submit" class="btn btn-danger" onClick={() => {progress("In Progress", task);}}>In Progress</button>
                                                                    <button type="submit" class="btn btn-success ms-1" onClick={() => {progress("Completed", task);}}>Finished</button>
                                                                </td>
                                                            </tr>
                                                    ))

                                                ) : (
                                                        <h1>Loading....</h1>
                                            )}
                                        </tbody>
                                    </table>
                                    {showPage && <Pagination type="task" last={tasks.data.last_page} />}
                                </div>
                            </div>
                        {/* </div> */}
                    </div>
                </div>
        </div>
    );
};