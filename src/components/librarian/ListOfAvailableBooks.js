import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import { getDataAvailable } from "../helper/apicalls";
import { Link } from "react-router-dom";
import {ToastContainer, toast } from "react-toastify";
const ListOfAvailableBooks = () => {
  const context = useContext(UserContext);

  const navigate = useNavigate();
  const [values, setValues] = useState([]);

  const [cartData, setCartData] = useState([]);

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

  const books = "books";

  const handleAddToCart = (item, id) => {
    

      const updatedCartData = [...cartData, item];
      setCartData(updatedCartData);
      let email = context.user?.email;
      console.log(updatedCartData);
    
      let cartObject = {
        "id": item.id,
        "name": item.name,
        "author": item.author,
        "category": item.category,
        "quantity": item.quantity
      }
      console.log(item);
    
      // Retrieve existing cart data from local storage, if any
      const existingCartData = JSON.parse(localStorage.getItem("cartData")) || [];
    
      if(existingCartData.length < 3){
      // Add the new cart object to the existing cart data array
      const updatedCartDataArray = [...existingCartData, cartObject];
    
      // Store the updated cart data array into local storage as a stringified JSON object
      localStorage.setItem("cartData", JSON.stringify(updatedCartDataArray));
    
      /* disable button */
    
      setButtonStates((prevStates) => ({
        ...prevStates,
        [id]: true,
      }));
    }else{
    //  alert("You have reached the maximum book allowed for borrowing")
      toast("Reached the limit")
    }
    
  };
  

  const preload = () => {
    getDataAvailable(books).then((res) => setValues(res));
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
      {/* <Link to="/cart">Borrow</Link> */}
      <div className="d-flex flex-column min-vh-100">
        <div className="container">
        <>
        {context.user?.role === "librarian" && (
            <nav className="nav nav-tabs mb-4">
              <Link to="/listofavailable" className="nav-link">
                Available Books
              </Link>
              <Link to="/listofdamaged" className="nav-link">
                Damaged Books
              </Link>
            </nav>
           )}
            {/* <Outlet /> */}
          </>
          <div className="my-4 text-center">
            <h1 className="bg-default">List Of Available Books</h1>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Category</th>
                <th>Language</th>
                {context.user?.role === "member" && (
                    <th>Action</th>
                    )}
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
                    <td>
                      {context.user?.role === "member" && (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleAddToCart(row, row.id)}
                          disabled={buttonStates[row.id]}
                        >
                          Add To Cart
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListOfAvailableBooks;
