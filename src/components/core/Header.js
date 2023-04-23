import React, { useState, useEffect, useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import UserContext from "../../utils/UserContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const context = useContext(UserContext);
  console.log(context);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const categories = ["listofavailable", "listofdamaged", "Available Books", "Damaged Books"];

  const toggleOpen = () => setIsOpen(!isOpen);

  const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;

  
  // if (!context.user?.role) {
  //   return navigate("/", { replace: true });
  // }


  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <NavLink className="navbar-brand" to="/" style={{ marginLeft: "50px" }}>
        {context.user && context.user.role
          ? (context.user.role).toUpperCase()
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
          {context.user && context?.user.role === "librarian" ? (
            <>
              {/* <li className="nav-item">
            <NavLink className="nav-link text-white" to="/addbooks">
             Add Books
            </NavLink>
          </li> */}
              <li className="nav-item">
                <NavLink className="nav-link text-white text-uppercase" to="/listbooks">
                  Manage Books
                </NavLink>

              </li>
              {/* <NavLink to='/listbooks/listofavailable'>Featured</NavLink> */}
              {/* <li className="nav-item">
            <NavLink className="nav-link text-white" to="/addmembers">
              Register Member
            </NavLink>
          </li> */}
              <li className="nav-item">
                <NavLink className="nav-link text-white text-uppercase" to="/listmembers">
                  Manage Members
                </NavLink>
              </li>
              {/* <li className="nav-item">
            <NavLink className="nav-link text-white" to="/">
              Not Returned Books
            </NavLink>
          </li> */}
          {/* <li className="nav-item dropdown" onClick={toggleOpen}>
            <NavLink
              to="#"
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Categories
            </NavLink>
            <div className={menuClass} aria-labelledby="navbarDropdown">
              {categories && categories.map((cat, index) => (
                <NavLink
                  key={cat.id}
                  className="dropdown-item"
                  to={`/listbooks/${cat}`}
                >
                  {cat}
                </NavLink>
              ))}
            </div>
          </li>  */}
              <li className="nav-item">
                <NavLink className="nav-link text-white text-uppercase" to="/payment">
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
          ) : context.user && context?.user?.role === "member" ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link text-white text-uppercase" to="/listofavailable">
                  Available Book
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white text-uppercase" to="/borrowed">
                  BorrowedList
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white text-uppercase" to="/cart">
                  Cart
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
          ) : (
            ""
          )}
        </ul>
        {context.user && context.user.role ? (
           <button
           className="btn btn-outline-light me-4"
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
    {/* <Outlet/> */}
    </>
  );
};

export default Header;
