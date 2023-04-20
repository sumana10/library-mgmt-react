import axios from "axios";

const memberURL = "http://localhost:3000/books";

let result;

export const getData = () => {
  return axios.get(memberURL).then((res) => (result = res.data)).catch(err => console.log(err));
};

export const addData = (data) =>{
  return axios.post(memberURL, data);
}


export const deleteData = (id) =>{
    return axios.delete(memberURL + "/" + id);
}

export const updateData = (data, id) =>{
  return axios.put(memberURL + "/" + id, data);
}

export const getDataByID = (id) =>{

  const fetchByIDURL = memberURL + "/" + id;
  return axios.get(fetchByIDURL).then((res) => (result = res.data)).catch(err => console.log(err));


}
