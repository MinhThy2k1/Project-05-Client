import axios from "axios";

const prefix = "user";

export const userApi = {
    getToken: async (data: {
        userName: string;
        password: string;
    }) => {
        return await axios.post(`${import.meta.env.VITE_SV_API_URL}/${prefix}/get-token`, data)
    },
    // getData: async (data: {
    //     token: string
    // }) => {
    //     return await axios.post(`${import.meta.env.VITE_SV_API_URL}/${prefix}/get-data`, data)
    // }
}