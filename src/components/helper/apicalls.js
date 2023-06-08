import axios from "axios";

const URL = "http://localhost:3000/";

let result;

export const getData = (param) =>{
  return axios
  .get(URL+ param)
  .then((res) => res.data)
  .catch((err) => console.log(err));
}

export const getSpecificData = (argument) => {
  return axios
    .get(argument)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};


export const getDataAvailable = (param) =>{
  return axios
    .get(URL +  param)
    .then((res) => {
      return res.data.filter((book) => book.availability)
    })
    .catch((err) => console.log(err))
}


export const getDamagedBooks = (param) =>{
  return axios
  .get(URL + param)
  .then((res) =>{
    return res.data.filter((book) => book.damage > 0);
  })
  .catch((err) => console.log(err));
}

export const addData = (data, param) =>{
  return axios.post(URL + param, data)
}

export const deleteData = (id, param) =>{
  return axios.delete(URL + param + "/" + id)
}

export const updateData = (data, id, param) =>{
  return axios.put(URL + param + "/" + id, data);
}


export const updateSpecificData = async (data, id, param) =>{
  try{
    const response = await axios.patch(URL + param + "/" + id, data); 
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update data");
  }
}

export const updateByName = (data, query) => {
  return axios.patch(query, data);
};

export const updateMultipleData = (data, argument) => {
  return axios.patch(URL + argument, data);
};

export const getDataByID = (id, param) => {
  const fetchByIDURL = URL + param + "/" + id;
  return axios
    .get(fetchByIDURL)
    .then((res) => (result = res.data))
    .catch((err) => console.log(err));
};

export const getBorrowedDetails = (id, isReturn = false) => {
  const fetchByIDURL = `${URL}borrowing?member_id=${id}&return=${isReturn}`;
  return axios
    .get(fetchByIDURL)
    .then((res) => (result = res.data))
    .catch((err) => console.log(err));
};
//http://localhost:3000/books?id=12&id=13&id=14

export const getBooks = (ids) => {
  
  let url =  "http://localhost:3000/books?"

  for(let i = 0; i < ids.lenght && i < 3; i++){
    url += `id=${ids[i]}&`;
  }
  return axios
   .get(url)
   .then((res) => res.data)
   .catch((err) => console.log(err));
};



// export const updateBooks = (ids, data) => {
//   const idList = ids.join(',');
//   const url = `http://localhost:3000/books?id=${idList}`;

//   return axios.put(url, data, { headers: { 'Content-Type': 'application/json' } })
//     .then(response => {
//       console.log('Data updated successfully');
//       return response.data;
//     })
//     .catch(error => {
//       console.error('Error updating data:', error);
//       throw error;
//     });
// };
