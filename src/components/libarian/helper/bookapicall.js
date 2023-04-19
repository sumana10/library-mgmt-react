import axios from "axios";

const bookURL = "http://localhost:3000/books";

let result;

export const getBooks = () => {
  return axios.get(bookURL).then((res) => (result = res.data)).catch(err => console.log(err));
};


export const deleteBooks = (id) =>{
    return axios.delete(bookURL + "/" + id);
}

export const updateBooks = (data, id) =>{
  return axios.put(bookURL + "/" + id, data);
}

export const getBooksByID = (id) =>{

  const fetchByIDURL = bookURL + "/" + id;
  return axios.get(fetchByIDURL).then((res) => (result = res.data)).catch(err => console.log(err));


}
