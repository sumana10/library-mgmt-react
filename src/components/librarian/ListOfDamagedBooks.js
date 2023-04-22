import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import { getDamagedBooks } from "../helper/apicalls";
import { Link } from "react-router-dom";

const ListOfDmagedBooks = () => {
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

  const books = "books";

  const preload = () => {
    getDamagedBooks(books).then((res) => setValues(res));
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
          <div className="my-4 text-center">
            <h1 className="bg-default">List Of Damaged Books</h1>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Category</th>
                <th>Language</th>
                {/* <th>ISBN</th> */}
                {/* <th colSpan={2}>Action</th> */}
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
                    {/* <td>{row.isbn}</td> */}

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

export default ListOfDmagedBooks;
