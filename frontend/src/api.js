import axios from "axios";

const api = axios.create({
    baseURL: 'https://social-media-clone-using-mern-stack.onrender.com/api'
})

export default api
