import React from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../reducer/paginationSlice";
import { getAllTasks } from "../reducer/allTasksSlice";
import { getTasks } from "../reducer/taskSlice";
import { getAllUsers } from "../reducer/allUsersSlice";


export const Pagination = (props) => {

  let dispatch = useDispatch();
  const paginator = useSelector((state) => state.paginator);
  let tabindex = paginator.page;


  async function tab(index) {
    if (props.type == "user") {
      await dispatch(getAllUsers(index)).then((res) => {
        dispatch(setPage(index));
      });
    };
    if (props.type == "task") {
      dispatch(getTasks(index)).then((res) => {
        dispatch(setPage(index));
      });
    }
    if (props.type == "admin") {
      dispatch(getAllTasks(index)).then((res) => {
        dispatch(setPage(index));
      });
    }
  };


  return (
    <div>
       <div className="paginator">
        <Button onClick= {()=> {tab(tabindex-1)}}  disabled={paginator.page == 1} >Previous</Button>
        <Button onClick= {()=> {tab(tabindex)}}    disabled={paginator.page}>{paginator.page}</Button>
        <Button onClick= {()=> {tab(tabindex+1)}}  disabled={paginator.page >= props.last} >Next</Button>
      </div>
    </div>
  )
}