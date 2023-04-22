import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import {getBooks, deleteBooks} from "./helper/bookapicall";
import UserContext from "../../utils/UserContext";
import { getData, deleteData } from "../helper/apicalls";
import { Outlet, Link, Route } from "react-router-dom";
import ListOfAvailableBooks from "./ListOfAvailableBooks";
import ListOfDmagedBooks from "./ListOfDamagedBooks";

const ListBooks = () => {
  const context = useContext(UserContext);

  console.log(context.user?.role);

  const navigate = useNavigate();
  const [values, setValues] = useState([]);

  const books = "books";

  const preload = () => {
    getData(books).then((res) => setValues(res));
  };

  useEffect(() => {
    preload();
  }, []);

  const handleDelete = (id) => {
    deleteData(id, books).then((data) => {
      preload();
    });
  };

  const handleUpdate = (id) => {
    const updateurl = `/addbooks?id=${id}`;
    navigate(updateurl);
  };

  if (context.user?.role !== "librarian") {
    return navigate("/", { replace: true });
  }
  // if (!context.user?.role || (context.user?.role !== "Librarian" && context.user?.role !== "OtherRole")) {
  //   return navigate('/some-other-page', { replace: true });
  // }
  /** 
   * 
   * 
   * 
   * **/

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <div className="container">
          <>
            <nav className="nav nav-tabs mb-4">
              <Link to="/listofavailable" className="nav-link">
                Available Books
              </Link>
              <Link to="/listofdamaged" className="nav-link">
                Damaged Books
              </Link>
            </nav>

            {/* <Outlet /> */}
          </>
          <div class="my-4 d-flex justify-content-between align-items-center">
            <h1 class="mb-0">List Of Books</h1>
            <button
              class="btn btn-primary"
              type="button"
              onClick={() => navigate("/addbooks")}
            >
              Add Books
            </button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Category</th>
                <th>Language</th>
                <th>ISBN</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {values &&
                values.map((row, index) => (
                  <tr key={index}>
                    <td>{row.name}</td>
                    <td>{row.author}</td>
                    <td>{row.category}</td>
                    <td>{row.language}</td>
                    <td>{row.isbn}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(row.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleUpdate(row.id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
       
    </>
  );
};

export default ListBooks;
