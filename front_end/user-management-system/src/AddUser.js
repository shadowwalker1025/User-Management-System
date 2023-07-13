import axios from "axios";
import { useState } from "react";
import { addUser } from "./userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://back-end-one-xi.vercel.app/users/add", { id, name, email, phone })
      .then((res) => {
        dispatch(addUser(res.data));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              placeholder="Enter ID"
              className="form-control"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter Phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={handleGoBack}>
              Back
            </button>
            <button className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
