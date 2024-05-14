import axios from "axios"

const apiClient = axios.create({
    baseURL: "http://localhost:8888/api/v1",
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
})

export { apiClient }