import React,{useState, useEffect} from "react";
import { getBorrowedDetails } from "../helper/apicalls";
import getReturnedBooks from "../../utils/getReturnedBooks";
import { Link } from "react-router-dom";

const NotReturnedBooks = () => {


// const url = `http://localhost:3000/borrowing?member_id=4&&return=true`
//const context = useContext(UserContext);

 // const navigate = useNavigate();
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
      .filter(obj => !obj.return)
      .flatMap(obj => obj.bookname)
      .map(book => ({ name: book.name, quantity: book.quantity }))
      .filter(name => name);

    setBorrowedBooks(bookNames);
  }, [values]);

  console.log(bookNames)
// let bookNames;
// useEffect(() => {
//   bookNames = values
//     .flatMap(obj => obj.bookname)
//     .map(book => book.name)
//     .filter(name => name);

//   setBorrowedBooks(bookNames);
// }, [values]);

// const returnedBooks = getReturnedBooks(values);



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
          <h1 class="bg-default">Yet To Return</h1>
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
              <td>{row.name}</td>
              <td>22-05-2023</td>
            </tr>
           
             ))} 
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotReturnedBooks;
