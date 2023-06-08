import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getDataByID, updateData, addData } from "../helper/apicalls";

const AddBooks = () => {

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const books = "books";
  

  const [values, setValues] = useState({
    name: "",
    author: "",
    category: "",
    language: "",
    isbn: "",
    availability: true,
    quantity: "",
    damage: "",
  });

  const {
    name,
    author,
    category,
    language,
    isbn,
    quantity,
    damage,
    availability,
  } = values;

  const navigate = useNavigate();

  

  useEffect(() =>{
    preload();
  },[])

  const preload = () =>{
    getDataByID(id, books)
    .then((res) =>{
      if(res) setValues(res);
    })
  }
 
  

  const saveBooks = () => {
    let newObj = {
      name,
      author,
      category,
      language,
      isbn,
      quantity,
      damage,
      availability,
    };

    if(!id){
      
        addData(newObj, books)
        .then(res => {
          navigate("/listbooks")
        });
    }
    else{
      
      updateData(newObj, id, books)
      .then(res => navigate('/listbooks'))
      .catch(err => console.log(err))
    }

  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <div className="container">
          <div className="my-4 text-center">
            <h1>Add Books</h1>
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
              onChange={(e) => setValues({ ...values, author: e.target.value })}
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
                onChange={(e) =>
                  setValues({ ...values, language: e.target.value })
                }
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="ISBN"
                aria-label="ISBN"
                value={isbn}
                onChange={(e) => setValues({ ...values, isbn: e.target.value })}
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Enter Quantity"
                aria-label="Enter Quantity"
                value={quantity}
                onChange={(e) =>
                  setValues({ ...values, quantity: e.target.value })
                }
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Damage No"
                aria-label="Damage No"
                value={damage}
                onChange={(e) =>
                  setValues({ ...values, damage: e.target.value })
                }
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
              onChange={(e) =>
                setValues({ ...values, category: e.target.value })
              }
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              checked={availability}
              onChange={(e) =>
                setValues({ ...values, availability: e.target.value })
              }
            />
            <label class="form-check-label" for="exampleCheck1">
              Availability
            </label>
          </div>
          <button
            className="btn bg-primary text-white"
            style={{ display: "block", width: "100%" }}
            onClick={saveBooks}
          >
            Enter Books
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBooks;
