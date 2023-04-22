import React, { useEffect, useState, useContext } from "react";
import { formatDate } from "../../utils/formatedate";
import { addData, updateMultipleData, updateData, updateSpecificData } from "../helper/apicalls";
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
  const handleClick = () => {

    alert("Clicked")
    // const updatedData = [...data, item];
    // setData(updatedData);
  //    console.log( cart)
     const formattedToday = formatDate(0);
      const formatted30Days = formatDate(30);

      const bookname = cart.filter((book) => book.name);

      console.log(bookname);

    const borrowObject = {
        "member_id": "4",
        "issuedate": formattedToday,
        "returndate": formatted30Days,
        "bookname": bookname,
    }

     let borrowing = "borrowing";
     console.log(borrowObject)
    console.log("Updated Quantity")
     const updatedBooks = bookname.map((book) => {
      const quantity =
        bookQuantities[book.id] !== undefined
          ? bookQuantities[book.id]
          : book.quantity - 1;
  
      return { ...book, quantity };
    });

    console.log(updatedBooks);

   //  const bookurl = "books"
     const bookurl = "books";
     for (let i = 0; i < updatedBooks.length; i++) {
       const bookId = updatedBooks[i].id;
       const bookData = updatedBooks[i];
       updateSpecificData(bookData, `${bookId}` , `${bookurl}`)
         .then(res => console.log(res))
         .catch(err => console.log(err));
     }
     

    // let URL = "http://localhost:3000/"

    // const updateMultipleBookQuantities = (updatedBooks) => {
    //   updatedBooks.forEach(book => {
    //     axios.put(`${URL}books/${book.id}`, {quantity: book.quantity})
    //       .then(response => console.log(response.data))
    //       .catch(error => console.log(error));
    //   });
    // }
    
    // console.log(updateMultipleBookQuantities);
    addData(borrowObject, borrowing).then(res => {
    
    localStorage.clear();
    navigate('/listofavailable')

    })
    
    //setCart("")

    //localStorage.clear();
    //navigate('/listofavailable')
  };

  useEffect(() => {}, []);
  const formStyle = {
    maxWidth: "600px",
    margin: "80px auto",
  };

  // const listItemStyle = {
  //   marginLeft: "20px",
  // }
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
