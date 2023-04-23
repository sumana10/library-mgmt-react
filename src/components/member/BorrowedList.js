import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import {
  getBorrowedDetails,
  updateSpecificData,
  updateByName,
  getSpecificData,
} from "../helper/apicalls";
import { Outlet, Link } from "react-router-dom";

const BorrowedList = () => {
  const context = useContext(UserContext);

  const navigate = useNavigate();
  const [values, setValues] = useState([]);

  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [buttonStates, setButtonStates] = useState({});
  const [bookData, setBookData] = useState([]);

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

  console.log("I AM BORROWED DATA");
  console.log(values);

  //Filter data which are not returned
  useEffect(() => {
    if (values.length) {
      let bookNames = values
        .filter((book) => !book.return)
        .map((book) => book.bookname)
        .flat();
      console.log(bookNames);
      setBorrowedBooks(bookNames);
    }
  }, [values]);

  console.log("I AM BORROWED NOT RETURNED DATA");
  console.log(borrowedBooks);

  

  const handleToReturn =  async(data, id) => {

    //Get Specific Book Object

    const url = `http://localhost:3000/books?name=${data}`;

   // try {
      const res =  await getSpecificData(url);
      setBookData(res);
      console.log(bookData);

      // const updatedBooks = bookData.map((book) => {
      //   if (book.name === data) {
      //     return {
      //       ...book,
      //       quantity: book.quantity + 1,
      //     };
      //   } else {
      //     return book;
      //   }
      // });

      // console.log("updated quantity");
      // console.log(updatedBooks);

      //Update books collection quantity

      // const bookurl = "books";
      // for (let i = 0; i < updatedBooks.length; i++) {
      //   let bookId = updatedBooks[i].id;
      //   try {
      //     const res = await updateSpecificData(
      //       updatedBooks[i],
      //       `${bookId}`,
      //       `${bookurl}`
      //     );
      //     console.log(res);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // }

      //Get not returned in borrowing list

      // const notReturned = values.filter((book) => book.return);
      // const updatedBorrow = notReturned.map((borrow) => {
      //   if (borrow.return) {
      //     return {
      //       ...borrow,
      //       return: true,
      //     };
      //   } else {
      //     return borrow;
      //   }
      // });
      // console.log("NOT RETURNED DATA");
      // console.log(updatedBorrow);

      //Update borrowing list

      // const borrowingUrl = "borrowing";
      // for (let i = 0; i < updatedBorrow.length; i++) {
      //   let borrowId = updatedBooks[i].id;
      //   try {
      //     const res = await updateSpecificData(
      //       updatedBorrow[i],
      //       `${borrowId}`,
      //       `${borrowingUrl}`
      //     );
      //     console.log(res);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // }

      //button disable state update
      setButtonStates((prevStates) => ({
        ...prevStates,
        [id]: true,
      }));
  //  } catch (err) {
    //  console.log(err);
  //  }
  };

  //console.log(bookNames);

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
                {/* <th>Issuedate</th>
                <th>Returndate</th> */}
                <th>Action</th>
                {/* <th>ISBN</th> */}
                {/* <th colSpan={2}>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {borrowedBooks &&
                borrowedBooks.map((row, index) => (
                  <tr>
                    <td>{row}</td>
                    {/* <td>{row.issuedate}</td>
                    <td>{row.returndate}</td> */}
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleToReturn(row, index)}
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
