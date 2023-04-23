import React, { useEffect, useState, useContext } from "react";
import { formatDate } from "../../utils/formatedate";
import { addData, updateMultipleData, updateData, updateSpecificData, getBooks } from "../helper/apicalls";
import UserContext from "../../utils/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Cart = () => {

  const context = useContext(UserContext);
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
  //localStorage.clear();
  const [bookQuantities, setBookQuantities] = useState({});

  const [cart, setCart] = useState(cartData);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [updatedbooks, setUpdatedBooks] = useState([]);

  const bookIds = cart.map((book) => book.id);
  console.log(bookIds);

  const preload = async () => {
    try {
      const res = await getBooks(bookIds);
      setBooks(res);
      console.log(books);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    preload();
  }, []);



  const handleClick = async() => {

    alert("Borrowed")

    const formattedToday = formatDate(0);
    const formatted30Days = formatDate(30);


    const booksToBorrow = cart.map((book) => book.name);

    const borrowObject = {
        "member_id": "4",
        "issuedate": formattedToday,
        "returndate": formatted30Days,
        "bookname": booksToBorrow,
        "return": false,
    }

     let borrowing = "borrowing";
     console.log(borrowObject);
     
     console.log(bookIds);
     console.log(books)

     const updatedData = books.map(item => {
      if (bookIds.includes(item.id)) {

        console.log(item)
       return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });
  setBooks(updatedData);
  console.log(updatedData);

    console.log("updated quantity");
    console.log(updatedData);

     const bookurl = "books";
  

     for (let i = 0; i < updatedData.length; i++) {
      const bookId = updatedData[i].id;
      const bookData = updatedData[i];
      try {
        const res = await updateSpecificData(bookData, `${bookId}`, `${bookurl}`);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    
   
   addData(borrowObject, borrowing).then(res => {
    
     localStorage.clear();
     navigate('/listofavailable')

    })
    

  };

  useEffect(() => {}, []);
  const formStyle = {
    maxWidth: "600px",
    margin: "80px auto",
  };


  if (!context.user?.role) {
    return navigate("/", { replace: true });
  }

  return (
    <div class="d-flex flex-column min-vh-100">
      <div class="container" style={formStyle}>
        <div class="my-4 text-center">
          <h1>{context.user?.email}</h1>
        </div>
        <ul class="list-group">
          {cart.map((item, index) => (
            <li class="list-group-item list-group-item-primary" key={item.index}>
              {item.name} - {item.author} - {item.category}
            </li>
          ))}
        </ul>
        <div class="d-grid gap-2">
          <button
            type="button"
            class="btn btn-primary btn-block"
            onClick={() => handleClick()}
          >
            Borrow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
