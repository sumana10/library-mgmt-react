import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";


const Login = () => {

  const context = useContext(UserContext);
  const navigate = useNavigate();

  const url = "http://localhost:3000/user";

  const [data, setData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [value, setValues] = useState([]);

  const { email, password, role } = data;

 // const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios.get(url).then((res) => {
      console.log(res.data);

      setValues(res.data);
    });
  };

  const handleLogin = () => {

    console.log(role);

    if(role === "Librarian"){
      if (value[0].email === email && value[0].password === password){

        context.setUser({ email: email, role: role });

        navigate("/listbooks");

      }
   }else if(role === "Member"){

    context.setUser({ email: email, role: role });
    navigate("/listofavailable");
   }
      
     else alert("Authentication Fail");
  };

  const formStyle = {
    maxWidth: "600px",
    margin: "80px auto",
  };
  return (
    <div class="d-flex flex-column min-vh-100">
      <div class="container" style={formStyle}>
        <div class="my-4 text-center">
          <h1>Welcome Readers...</h1>
        </div>
        <div class="form-group mb-2">
          <label for="name"></label>
          <input
            type="email"
            class="form-control"
            id="email"
            value={email}
            placeholder="Enter username"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div class="form-group mb-2">
          <label for="date"></label>
          <input
            type="password"
            class="form-control"
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div class="form-group mb-3">
          <label for="category"></label>
          <select
            class="form-control"
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
          class="btn btn-primary btn-block"
          style={{ display: "block", width: "100%" }}
          onClick={() => handleLogin()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
