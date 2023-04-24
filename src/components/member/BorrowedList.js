import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import {
  getBorrowedDetails,
  updateSpecificData,
  updateByName,
  getSpecificData,
  updateData,
} from "../helper/apicalls";
import { Outlet, Link } from "react-router-dom";

const BorrowedList = () => {
  const context = useContext(UserContext);

  const navigate = useNavigate();
  const [values, setValues] = useState([]);

  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [buttonStates, setButtonStates] = useState({});
  const [bookData, setBookData] = useState([]);
  const [refresh, setRefresh] = useState(false);


  //Initial loading of borrowing list
  const preload = async () => {
    try {
      const res = await getBorrowedDetails(4);
      setValues(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    preload();
  }, []);

  useEffect(() => {
    preload();
  }, [refresh]);

  console.log("I AM BORROWED DATA");
  console.log(values);

  //Filter data which are not returned
  // useEffect(() => {
  //   if (values.length) {
  //     let bookNames = values
  //       .filter((book) => !book.return)
  //       .map((book) => book.bookname)
  //       .flat();
  //     console.log(bookNames);
  //     setBorrowedBooks(bookNames);
  //   }
  // }, [values]);

  // console.log("I AM BORROWED NOT RETURNED DATA");
  // console.log(borrowedBooks);

  const handleToReturn = async (data, id) => {
    const borrowingUrl = "borrowing";
    const updatedBorrow = {
      member_id: "4",
      issuedate: data.issuedate,
      returndate: data.returndate,
      bookname: data.bookname,
      return: true,
    };
    console.log("NOT RETURNED DATA");
    console.log(updatedBorrow);

    try {
      const res = await updateSpecificData(
        updatedBorrow,
        `${data.id}`,
        `${borrowingUrl}`
      );
      console.log(res);
      setRefresh(!refresh);
    } catch (err) {
      console.log(err);
   }

    //fetch books by name 
    for (const bookName of data.bookname) {
      const url = `http://localhost:3000/books?name=${bookName}`;
    
      try {
        const res = await getSpecificData(url);
        const bookData = res[0]; // assuming the response is an array with one item
        const quantityToAdd = 1;
        const updatedBook = { ...bookData, quantity: bookData.quantity + parseInt(quantityToAdd)};
        const bookURL = "books";
    
        console.log("Updated Book")
        console.log(updatedBook)
    
        try {
          const res = await updateSpecificData(
            updatedBook,
            `${bookData.id}`,
            `${bookURL}`
          );
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    }
  
    //button disable state update
    setButtonStates((prevStates) => ({
      ...prevStates,
      [id]: true,
    }));
  };

  if (!context.user?.role) {
    return navigate("/", { replace: true });
  }

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <div className="container">
          <>
            <nav className="nav nav-tabs mb-4">
              <Link to="/returnedbooks" className="nav-link">
                Returned Books
              </Link>
              <Link to="/notreturnedbooks" className="nav-link">
                Yet To Return
              </Link>
            </nav>

            <Outlet />
          </>
          <div className="my-4 text-center">
            <h1 className="bg-default">List Of Borrowed Books</h1>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                {/* <th>Issuedate</th>*/}
                <th>Returndate</th>
                <th>Action</th>
                {/* <th>ISBN</th> */}
                {/* <th colSpan={2}>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {values &&
                values.map((row, index) => (
                  <tr>
                    <td>{row.bookname.join(",")}</td>
                    <td>{row.returndate}</td>
                    {/*<td>{row.returndate}</td> */}
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleToReturn(row)}
                        disabled={buttonStates[index]}
                      >
                        Return
                      </button>
                    </td>

                    {/* <div
                      class="btn-group"
                      role="group"
                      aria-label="Counter Button"
                    >
                      <button type="button" className="btn btn-primary" onClick={handleDecrement}>
                        -
                      </button>
                      <button type="button" className="btn btn-primary">
                       {/* {row.quantity} */}
                    {/* {count}
                      </button>
                      <button type="button" className="btn btn-primary" onClick={handleIncrement}>
                        +
                      </button>
                    </div> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BorrowedList;
