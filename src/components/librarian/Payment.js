import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import { addData } from "../helper/apicalls";
import {ToastContainer, toast } from "react-toastify";
const Payment = () => {
 
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    member_id: "",
    date: "",
    fees: "",
  });

  // const [errors, setErrors] = useState({
  //   member_id: "",
  //   date: "",
  //   fees: ""
  // });

  const { member_id, date, fees } = data;
//  const [value, setValues] = useState([]);

  const handlePayment = () => {
   // console.log(value[0]?.role);

   console.log(data);

   addData(data, "payment").then(res => {
    //  navigate("/listmembers");
      setData({
        ...data,
        member_id: "",
        date: "",
        fees: "",
      })
    })
    toast("Payment Done");
  };

  const formStyle = {
    maxWidth: "600px",
    margin: "80px auto",
  };
  if (context.user?.role !== "librarian") {
    return navigate("/", { replace: true });
  }
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container" style={formStyle}>
        <div className="my-4 text-center">
          <h1>Payment Collection</h1>
        </div>
        <div className="form-group mb-2">
          <label for="name"></label>
          <input
            type="text"
            className="form-control"
            id="member_id"
            value={member_id}
            placeholder="Enter member_id"
            onChange={(e) => setData({ ...data, member_id: e.target.value })}
          />
        </div>
        <div className="form-group mb-2">
          <label for="date"></label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            placeholder="Enter your password"
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
        </div>
        <div className="form-group mb-2">
          <label for="date"></label>
          <input
            type="text"
            className="form-control"
            id="fees"
            value={fees}
            placeholder="Enter fees"
            onChange={(e) => setData({ ...data, fees: e.target.value })}
          />
        </div>
        {/* <div className="form-group mb-3">
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
        </div> */}
        <button
          className="btn btn-primary btn-block"
          style={{ display: "block", width: "100%" }}
          onClick={() => handlePayment()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Payment;
