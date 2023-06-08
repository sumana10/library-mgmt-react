import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";

const Login = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "member@gmail.com",
    password: "1234567",
    role: "member",
  });

  const [value, setValues] = useState([]);

  const { email, password, role } = data;

  const url = `http://localhost:3000/user?email=${email}`;

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getUser();
  }, [url]);

  const getUser =  () => {
    axios.get(url).then((res) => {
      console.log(res.data);

      setValues(res.data);
    });
  };

  const handleLogin = () => {
    console.log(value[0]?.role);

    if (value[0]?.role === "librarian") {
      console.log("hello" + value[0]?.email);

      context.setUser({ email: value[0]?.email, role: value[0]?.role });

      console.log(context?.user?.email);

      navigate("/listbooks");
    } else if (value[0]?.role === "member") {
      console.log(value[0]?.email);

      context.setUser({ email: value[0]?.email, role: value[0]?.role });
      console.log(context?.user?.email);
      navigate("/listofavailable");
    }
    else{
      alert("Authetication Failed")
    }
  };

  const formStyle = {
    maxWidth: "600px",
    margin: "80px auto",
  };
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container" style={formStyle}>
        <div className="my-4 text-center">
          <h1>Welcome Readers...</h1>
        </div>
        <div className="form-group mb-2">
          <label for="name"></label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            placeholder="Enter username"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="form-group mb-2">
          <label for="date"></label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <label for="category"></label>
          <select
            className="form-control"
            id="category"
            value={role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          >
            <option value="">Choose a role</option>
            <option value="Librarian">Librarian</option>
            <option value="Member">Member</option>
          </select>
        </div>
        <button
          className="btn btn-primary btn-block"
          style={{ display: "block", width: "100%" }}
          onClick={handleLogin}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
