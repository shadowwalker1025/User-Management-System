import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./userSlice";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [id, users]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`https://back-end-one-xi.vercel.app/users/${id}`, { name, email, phone })
      .then((res) => {
        dispatch(updateUser({ id, name, email, phone }));
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
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Phone</label>
            <input
              type="text"
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
            <button className="btn btn-success">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
