import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { useNavigate } from "react-router";
import { Container, Navbar, Nav} from "react-bootstrap";
import api from "../API/api";
import { useDispatch,useSelector } from "react-redux";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getUser, removeUser, setAdmin } from "../reducer/userSlice";
import { removeSearch, setSearch } from "../reducer/searchSlice";
import { setPage } from "../reducer/paginationSlice";
import { getTasks, removeTasks} from "../reducer/taskSlice";
import { getAllTasks, removeAllTasks } from "../reducer/allTasksSlice"; 
import { removeAllUsers, getAllUsers } from "../reducer/allUsersSlice";


export const Navbarm = () => {

  useEffect(() => { init();}, []);

  let dispatch = useDispatch();
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      await api.logout();
      dispatch(setAdmin(false));
      dispatch(removeUser());
      // dispatch(removeTasks());
      // dispatch(removeAllUsers());
      // dispatch(removeAllTasks());
      dispatch(removeSearch());
      navigate("/", { replace: true });
      localStorage.removeItem("user");
    } catch (err) {
      console.log(err);
    }
  };

  const ResetPassword = async () => {
    await api.resetpasswordrequest(email).then((res) => {
      navigate("/pleaseverifyemail", { replace: true });
    });
  };
  async function init() {
    await dispatch(getUser()).then((res) => {
      if (res.type === "user/getUser/rejected") {
        console.log("navbar",res);
        navigate("/Login", { replace: true });
      }
    });
  }

  let debouncedGet = useCallback(
    _.debounce(() => {
      dispatch(getTasks(1));
      dispatch(getAllUsers(1));
      dispatch(getAllTasks(1));
      dispatch(setPage(1));
    }, 500),
    []
  );

  let handleSearch = (event) => {
    console.log(event.target.value);
    dispatch(setSearch(event.target.value));
    dispatch(setPage(1));
    debouncedGet();
  };
  const search = useSelector((state) => state.search);
  const user = useSelector((state) => state.user);
  let email = user.data.email;

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/Dashboard/profile"><h2>Dashboard</h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard/tasks">Tasks</Nav.Link>
            <Nav.Link href="/dashboard/users">Users</Nav.Link>
            <NavDropdown title={user.data.name} id="basic-nav-dropdown">
              <NavDropdown.Item href="/dashboard/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={ResetPassword}>Reset Password</NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              placeholder="  Search..."
              value={search.data}
              onChange={(event) => handleSearch(event)}
            />
          </label>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};