import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "./userSlice";

const Users = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    axios
      .delete(`https://back-end-one-xi.vercel.app/users/${id}`)
      .then((res) => {
        dispatch(deleteUser({ id }));
        window.location.reload(); // Reload the window
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="vh-100 bg-primary d-flex flex-column align-items-center">
      <div className="container bg-white rounded p-3 mt-5">
        <h2 className="text-center mb-4">User Management System</h2>
        <Link to="/create" className="btn btn-success btn-sm mb-3">
          Add +
        </Link>
        <div className="table-responsive" style={{ maxHeight: "400px", overflow: "auto" }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ position: "sticky", top: 0 }}>Id</th>
                <th style={{ position: "sticky", top: 0 }}>Name</th>
                <th style={{ position: "sticky", top: 0 }}>Email</th>
                <th style={{ position: "sticky", top: 0 }}>Phone</th>
                <th style={{ position: "sticky", top: 0 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <Link
                        to={`/edit/${user.id}`}
                        className="btn btn-sm btn-success me-2"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
