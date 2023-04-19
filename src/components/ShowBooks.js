import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import { getBooks, deleteBooks} from "./libarian/helper/bookapicall";

const ShowBooks = () => {
  

  const navigate = useNavigate();
  const [values, setValues] = useState([]);

  const preload = () =>{
    getBooks().then(res => setValues(res))
  }

  useEffect(() => {
    preload()
  }, []);


  // const handleDelete = (id) => {
  //   const deleteurl = url + "/" + id;
  //   axios.delete(deleteurl).then(() => {
  //     setValues(values.filter(value => value.id !== id));
  //   });
  // };

  const handleDelete = (id) => {
    deleteBooks(id).then((data)=>{
      preload();
  })
}

  const handleUpdate = (id) => {
    const updateurl = `/bookupdate?id=${id}`;
    console.log(updateurl);
    navigate(updateurl);
  }

  return (
    <>
    <Header/>
    <div className="d-flex flex-column min-vh-100">
      <div className="container">
       <div className="my-4 text-center">
          <h1>Book Shelve</h1>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Category</th>
              <th>Language</th>
              <th>ISBN</th>
              <th colSpan={2}>Action</th>
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
                  <td>{row.isbn}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdate(row.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ShowBooks;
