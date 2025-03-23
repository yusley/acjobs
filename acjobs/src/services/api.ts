import axios from "axios";

const api = axios.create({
    baseURL: 'https://openingteste.mpac.mp.br',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api;