import { useState, useEffect, useContext } from "react";
import { getBorrowedDetails } from "../helper/apicalls";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";

const ReturnedBooks = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [values, setValues] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

   

  useEffect(() => {
    preload();
  }, []);

  const preload = async () => {
    try {
      const res = await getBorrowedDetails(4, true);
      setValues(res);
    } catch (error) {
      console.error(error);
    }
  };


  console.log("Returned Books")
  console.log(values);

  useEffect(() => {
    if (values.length) {
      let bookNames = values
        .filter((book) => book.return)
        .map((book) => book.bookname)
        .flat();
      console.log(bookNames);
      setBorrowedBooks(bookNames);
    }
  }, [values]);

  console.log(values);

  if (!context.user?.role) {
    return navigate("/", { replace: true });
  }
  return (
    <div class="d-flex flex-column min-vh-100">
      <div class="container">
        <nav class="nav nav-tabs mb-4">
          <Link class="nav-link" to="/returnedbooks">
            Returned Books
          </Link>
          <Link class="nav-link" to="/notreturnedbooks">
            Yet To Return
          </Link>
        </nav>
        <div class="my-4 text-center">
          <h1 class="bg-default">Return Books</h1>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Return date</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks &&
              borrowedBooks.map((row, index) => (
                <tr>
                  <td>{row}</td>
                  <td>22-05-2023</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnedBooks;
