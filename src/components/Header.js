import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <NavLink className="navbar-brand" to="/" style={{ marginLeft: "50px" }}>
        Book Reading App
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
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/bookentries">
              Book Entries
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/showbooks">
              Register Students
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/">
              Book Availability
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/">
              Not Returned Books
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/">
              Payment Received
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link text-white" href="#">
              Available Book (Student)
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              Cart (Student)
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              Not Returned Books (Student)
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
