import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer"

const BookEntries = () => {


  const [values, setValues] = useState({
    name: "",
    author: "",
    category: "",
    language: "",
    isbn: "",
});

const {name, author, category, language, isbn} = values;

  const navigate = useNavigate();

  let url = "http://localhost:3000/books";


  const saveBooks = () => {
    let newObj = {
        name,
        author,
        category,
        language,
        isbn,
    };

    axios
      .post(url, newObj)
      .then((res) => {
        console.log(res);
        navigate("/showbooks");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <Header/>
    <div className="d-flex flex-column min-vh-100">
      <div className="container">
        <div className="my-4 text-center">
          <h1>Book Entry Form</h1>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="name"></label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Book Name"
            value={name}
            onChange={(e) => setValues({...values, name: e.target.value})}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="author"></label>
          <input
            type="text"
            className="form-control"
            id="author"
            placeholder="Enter Author Name"
            value={author}
            onChange={(e) => setValues({...values, author: e.target.value})}
          />
        </div>
        {/* add field */}
        <div class="row mb-3">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Language"
              aria-label="Enter Language"
              value={language}
              onChange={(e) => setValues({...values, language: e.target.value})}
            />
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="ISBN"
              aria-label="ISBN"
              value={isbn}
              onChange={(e) => setValues({...values, isbn: e.target.value})}
            />
          </div>
        </div>
        <div className="form-group mb-5">
          <label htmlFor="author"></label>
          <input
            type="text"
            className="form-control"
            id="category"
            placeholder="Enter Category"
            value={category}
            onChange={(e) => setValues({...values, category: e.target.value})}
          />
        </div>
        <button className="btn bg-primary text-white" style={{display:"block", width:"100%"}} onClick={() => saveBooks()}>
          Enter Books
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default BookEntries;
