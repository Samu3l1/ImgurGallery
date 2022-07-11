import axios from "axios";
import {BASE_URL, CLIENT_ID} from "./endpoints";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        authorization: "Client-ID " + CLIENT_ID
    },
})

export default api;