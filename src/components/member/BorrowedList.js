import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import { getBorrowedDetails } from "../helper/apicalls";

const BorrowedList = () => {
  const context = useContext(UserContext);

  const navigate = useNavigate();
  const [values, setValues] = useState([]);



  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const books = "borrowing";

  const preload = () => {
    getBorrowedDetails(4).then((res) => setValues(res));
  };

  useEffect(() => {
    preload();
  }, []);

  console.log(values);

  if (!context.user?.role) {
    return navigate("/", { replace: true });
  }

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <div className="container">
          <div className="my-4 text-center">
            <h1 className="bg-default">List Of Borrowed Books</h1>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Issuedate</th>
                <th>Returndate</th>
                <th>Action</th>
                {/* <th>ISBN</th> */}
                {/* <th colSpan={2}>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {values &&
                values.map((row, index) => (
                  <tr key={index}>
                    <td>{row.bookname}</td>
                    <td>{row.issuedate}</td>
                    <td>{row.returndate}</td>
                    <td><button
                        className="btn btn-primary"
                        // onClick={() => handleAddToCart(row)}
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
