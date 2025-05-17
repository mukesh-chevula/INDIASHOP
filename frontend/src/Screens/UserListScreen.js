import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const [successDelete, setSuccessDelete] = useState(false);

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  const editHandler = (id) => {
    window.location.href = `/admin/user/${id}/edit`;
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      window.location.href = "/login";
    }
  }, [dispatch, successDelete, userInfo]);

  useEffect(() => {
    if (userDelete.success) {
      setSuccessDelete(true);
    }
  }, [userDelete]);

  useEffect(() => {
    if (successDelete) {
      dispatch(listUsers());
      setSuccessDelete(false);
    }
  }, [dispatch, successDelete]);

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Button
                    variant="light"
                    className="btn-sm me-2"
                    onClick={() => editHandler(user._id)}
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
