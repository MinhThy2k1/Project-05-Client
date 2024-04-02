import axios from "axios";
const prefix = "user"
export default {
    create: async (user: any) => {
        return await axios.post(`${import.meta.env.VITE_SV_API_URL}/${prefix}/register`, user)
    },
    update: async (id: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SV_API_URL}/${prefix}/${id}`, data)
    },
    login: async (loginData: any) => {
        return await axios.post(`${import.meta.env.VITE_SV_API_URL}/${prefix}/login`, loginData)
    },
    getUserById: async (id: number) => {
        return await axios.get(`${import.meta.env.VITE_SV_API_URL}/${prefix}/${id}`)
    },
    findMany: async function () {
        return await axios.get(`${import.meta.env.VITE_SV_API_URL}/${prefix}`);
    },
    decodeToken: async (token: string) => {
        return await axios.get(`${import.meta.env.VITE_SV_API_URL}/${prefix}/decodeToken/${token}`)
    },
    getToken: async (data: {
        loginInfo: string;
        password: string;
    }) => {
        return await axios.post(`${import.meta.env.VITE_SV_API_URL}/${prefix}/get-token`, data)
    },
    getData: async (data: {
        token: string;
    }) => {
        return await axios.post(`${import.meta.env.VITE_SV_API_URL}/${prefix}/get-data`, data)

    },
    findUserById: async function (id: number) {
        return await axios.get(`${import.meta.env.VITE_SV_API_URL}/${prefix}/${id}`);
    },
    updateimg: async (id: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SV_API_URL}/${prefix}/update/${id}`, data)
    },
}