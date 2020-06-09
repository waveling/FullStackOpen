import axios from 'axios';


const baseUrl = 'http://localhost:3001/persons'

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