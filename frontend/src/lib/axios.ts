import axios from "axios";

const envURL  = import.meta.env.DEV ? 'http://localhost:3000/api' : '/api'

const authAxios = axios.create({
  url: '/auth',
  baseURL: envURL,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
})

export default authAxios