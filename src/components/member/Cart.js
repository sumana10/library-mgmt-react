import React, { useEffect, useState, useContext } from "react";
import { formatDate } from "../../utils/formatedate";
import { addData } from "../helper/apicalls";
import UserContext from "../../utils/UserContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {

  const context = useContext(UserContext);
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
  //localStorage.clear();

  const [cart, setCart] = useState(cartData);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const handleClick = () => {

    alert("Clicked")
    // const updatedData = [...data, item];
    // setData(updatedData);
    // console.log( data[0].name)
    // const formattedToday = formatDate(0);
    // const formatted30Days = formatDate(30);
    // const borrowObject = {
    //     "member_id": "4",
    //     "issuedate": formattedToday,
    //     "returndate": formatted30Days,
    //     "bookname": data[0].name,
    // }
    // let borrowing = "borrowing";
    // console.log(borrowObject)
    // addData(borrowObject, borrowing).then(res => {
    //     // navigate("/listmembers");
    //     alert("borrowed")
    //   })
    //setCart("")
    //localStorage.clear();
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
          {cart.map((item) => (
            <li class="list-group-item list-group-item-primary" key={item.id}>
              {item.bookname} - {item.author} - {item.category}
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
