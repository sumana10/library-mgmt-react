import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import UserContext from "../../utils/UserContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const context = useContext(UserContext);
  console.log(context);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <NavLink className="navbar-brand" to="/" style={{ marginLeft: "50px" }}>
        {context.user && context.user.role
          ? context.user.role
          : " Book Reading App"}
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          {context.user && context.user.role === "Librarian" ? (
            <>
              {/* <li className="nav-item">
            <NavLink className="nav-link text-white" to="/addbooks">
             Add Books
            </NavLink>
          </li> */}
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/listbooks">
                  Manage Books
                </NavLink>
              </li>
              {/* <li className="nav-item">
            <NavLink className="nav-link text-white" to="/addmembers">
              Register Member
            </NavLink>
          </li> */}
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/listmembers">
                  Manage Members
                </NavLink>
              </li>
              {/* <li className="nav-item">
            <NavLink className="nav-link text-white" to="/">
              Not Returned Books
            </NavLink>
          </li> */}
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/payment">
                  Payment
                </NavLink>
              </li>
              {/* <li className="nav-item">
            <NavLink className="nav-link text-white" style={{ cursor: "pointer" }}
								onClick={() => {context.setUser(null)
                 }}>
             Log Out
            </NavLink>
          </li> */}
            </>
          ) : context.user && context.user.role === "Member" ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/listofavailable">
                  Available Book
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" href="#">
                  Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Not Returned Books
                </a>
              </li>
              {/* <li className="nav-item">
            <NavLink className="nav-link text-white" style={{ cursor: "pointer" }}
								onClick={() => {context.setUser(null)
                 }}>
             Log Out
            </NavLink>
          </li> */}
            </>
          ) : (
            ""
          )}
        </ul>
        {context.user && context.user.role ? (
           <button
           className="btn text-white"
           onClick={() => {
             context.setUser(null);
           }}
         >
           Log Out
         </button>
        ): (
          ""
        )}
       
      </div>
    </nav>
  );
};

export default Header;
