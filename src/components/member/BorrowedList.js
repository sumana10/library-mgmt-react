import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import { getBorrowedDetails, updateSpecificData, updateByName, getSpecificData } from "../helper/apicalls";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";

const BorrowedList = () => {
  const context = useContext(UserContext);

  const navigate = useNavigate();
  const [values, setValues] = useState([]);

  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [buttonStates, setButtonStates] = useState({});
  // const [count, setCount] = useState(0);

  // const handleIncrement = () => {
  //   setCount(count + 1);
  // };

  // const handleDecrement = () => {
  //   if (count > 0) {
  //     setCount(count - 1);
  //   }
  // };

  const books = "borrowing";

  const preload = () => {
    getBorrowedDetails(4).then((res) => setValues(res));
  };

  useEffect(() => {
    preload();
  }, []);

  console.log(values);
  let bookNames;
  useEffect(() => {
    bookNames = values
      .flatMap(obj => obj.bookname)
      .map(book => ({ name: book.name, quantity: book.quantity }))
      .filter(name => name);

    setBorrowedBooks(bookNames);
  }, [values]);

  
  const bookurl = "books";
  
 
  const [bookdata, setBookData] = useState();



  //const preload = () => {
   
 // };

  useEffect(() => {
    preload();
  }, []);

  const handleToReturn = (data, id) =>{
    
  
    const url = `http://localhost:3000/books?name=${data.name}`;

   // alert(url);

    getSpecificData(url).then((res) => setBookData(res));

    const updateData = {
      "name": data.name,
      "quantity": Number(data.quantity) + 1
    }

 //  alert(data.id);

   console.log(bookdata[0].id);

   let bookId = bookdata[0].id;
   const bookurl = "books";
    
    // updateByName(updateData, url)
    // .then(res => console.log(res))
    // .catch(err => console.log(err));

    // axios.put(url, updateData).then((res) => {
    //   console.log(res.data);

    // //  setValues(res.data);
    // });
    updateSpecificData(updateData, `${bookId}` , `${bookurl}`)
    .then(res => console.log(res))
    .catch(err => console.log(err));

    setButtonStates((prevStates) => ({
      ...prevStates,
      [id]: true,
    }));

  }

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
                    <td>{row.name}</td>
                    {/* <td>{row.issuedate}</td>
                    <td>{row.returndate}</td> */}
                    <td><button
                        className="btn btn-primary"
                        onClick={() => handleToReturn(row, index)}
                        disabled={buttonStates[index]}
                      >
                       Return
                      </button></td>

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
