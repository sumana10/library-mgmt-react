import axios from "axios";

const URL = "http://localhost:3000/";


let result;

export const getData = (argument) => {
  return axios.get(URL+argument).then((res) => (result = res.data)).catch(err => console.log(err));
};

export const getSpecificData = (argument) => {
  return axios.get(argument)
    .then((res) => res.data)
    .catch(err => console.log(err));
};


export const getDataAvailable = (argument) => {
  return axios.get(URL+argument).then((res) =>{

   return res.data.filter((book) => book.availability)

  })
  .catch(err => console.log(err));
};

export const getDamagedBooks = (argument) => {
  return axios.get(URL+argument).then((res) =>{

   return res.data.filter(book => book.damage > 0)

  })
  .catch(err => console.log(err));
};

export const addData = (data, argument) =>{
  return axios.post(URL+argument, data);
}


export const deleteData = (id, argument) =>{
    return axios.delete(URL+argument + "/" + id);
}

export const updateData = (data, id, argument) =>{
  return axios.put(URL+argument + "/" + id, data);
}

export const updateSpecificData = async (data, id, argument) => {
  try {
    const response = await axios.patch(URL+argument + "/" + id, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update data");
  }
};

export const updateByName = (data, query) =>{

  return axios.patch(query, data);

}

export const updateMultipleData = (data, argument) =>{
  return axios.patch(URL+argument, data);
}

export const getDataByID = (id, argument) =>{

  const fetchByIDURL = URL+argument + "/" + id;
  return axios.get(fetchByIDURL).then((res) => (result = res.data)).catch(err => console.log(err));


}

export const getBorrowedDetails = (id) =>{

  const fetchByIDURL = URL+ "borrowing" + "?member_id=" + id;
  return axios.get(fetchByIDURL).then((res) => (result = res.data)).catch(err => console.log(err));

}
//http://localhost:3000/books?id=12&id=13&id=14

export const getBooks = (ids) => {
  let url = 'http://localhost:3000/books?';
  
  for (let i = 0; i < ids.length && i < 3; i++) {
    url += `id=${ids[i]}&`;
  }

  return axios.get(url).then((res) => (result = res.data)).catch(err => console.log(err));
}


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