import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getDataByID, updateData, addData } from "../helper/apicalls";
import UserContext from "../../utils/UserContext";

const AddMembers = () => {

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  

  const context = useContext(UserContext);
  console.log(context);

  //borrowing add as an object

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    issuedate: "",
    expiredate: "",
    fine: 0,
    borrowing: "",
  });

  const {
    name,
    email,
    phone,
    issuedate,
    expiredate,
    fine,
    borrowing,
  } = values;

  const navigate = useNavigate();

  const members = "members";

  const preload = () => {
    getDataByID(id, members).then((res) => {
      if (res) {
        setValues(res);
      }
    });
  };
  
  
  useEffect(() => {
    preload()
  }, []);
  

  const saveMembers = () => {
    let newObj = {
        name,
        email,
        phone,
        issuedate,
        expiredate,
        fine,
        borrowing,
    };

    console.log(borrowing);

    const array = borrowing.split(",");
    console.log(array);

    console.log(newObj)

    if(!id){
      
        addData(newObj, members).then(res => {
          navigate("/listmembers");
        })
    }
    else{
      
      updateData(newObj, id, members).then(res =>{navigate('/listmembers');})
      .catch(err => console.log(err))
    }

  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <div className="container">
          <div className="my-4 text-center">
            <h1>Add Members</h1>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name"></label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Member Name"
              value={name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="author"></label>
            <input
              type="email"
              className="form-control"
              id="author"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          {/* add field */}
          <div class="row mb-3">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Enter Phone"
                aria-label="Enter Phone"
                value={phone}
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="fine"
                aria-label="fine"
                value={fine}
                onChange={(e) =>
                  setValues({ ...values, fine: e.target.value })
                }
              />
            </div>
           
          </div>
          <div class="row mb-3">
            <div class="col">
              <input
                type="date"
                class="form-control"
                placeholder="expiredate"
                aria-label="expiredate"
                value={expiredate}
                onChange={(e) =>
                  setValues({ ...values, expiredate: e.target.value })
                }
              />
            </div>
            <div class="col">
              <input
                type="date"
                class="form-control"
                placeholder="issuedate"
                aria-label="issuedate"
                value={issuedate}
                onChange={(e) => setValues({ ...values, issuedate: e.target.value })}
              />
            </div>
           
          </div>
          <div className="form-group mb-5">
            <label htmlFor="author"></label>
            <input
              type="text"
              className="form-control"
              id="borrowing"
              placeholder="Enter Borrowed Books"
              value={borrowing}
              onChange={(e) =>
                setValues({ ...values, borrowing: e.target.value })
              }
            />
          </div>
          <button
            className="btn bg-primary text-white"
            style={{ display: "block", width: "100%" }}
            onClick={() => saveMembers()}
          >
            Save Member
          </button>
        </div>
      </div>
    </>
  );
};

export default AddMembers;
