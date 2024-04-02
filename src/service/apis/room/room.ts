import axios from "axios";
const prefix = "room"
export default {
    create: async (data: any) => {
        return await axios.post(`${import.meta.env.VITE_SV_API_URL}/${prefix}`, data)
    },
    findMany: async function () {
        return await axios.get(`${import.meta.env.VITE_SV_API_URL}/${prefix}`);
    },
}