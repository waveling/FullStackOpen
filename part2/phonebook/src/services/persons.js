import axios from 'axios';


const baseUrl = 'https://young-ridge-99339.herokuapp.com/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const createContact = newObject => {
  return axios.post(baseUrl, newObject)
}

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const updateContact = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, createContact, deleteContact, updateContact };