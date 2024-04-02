import axios from "axios";
const prefix = "hotel"
export default {
    create: async (data: any) => {
        return await axios.post(`${import.meta.env.VITE_SV_API_URL}/${prefix}`, data)
    },
    findMany: async function () {
        return await axios.get(`${import.meta.env.VITE_SV_API_URL}/${prefix}`);
    },
    countbycity: async function (city: string) {
        return await axios.get(`${import.meta.env.VITE_SV_API_URL}/${prefix}/countbycity/${city})`);
    },
    findUnique: async function (id: number) {
        return await axios.get(`${import.meta.env.VITE_SV_API_URL}/${prefix}/find/${id}`);
    },
    update: async (id: any, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SV_API_URL}/${prefix}/${id}`, data)
    },
    findManys: async function () {
        return await axios.get(`${import.meta.env.VITE_SV_API_URL}/${prefix}/all`);
    },
}