import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../service/apis"
export type hotelStatus = "active" | "inactive" | "delete"
export type AvailableStatus = "active" | "inactive"
type addModal = true | false

export type hotel = {
    id: number;
    type: string;
    userId: number;
    distance: string;
    status: hotelStatus;
    cheapestprice: number;
    contact: string;
    name: string;
    image: string;
    address: string;
    city: string;
    locationDescription: string;
    createAt: string;
    updateAt: string;
    reason: string;
    img: string;
    user: user;

}
export type user = {
    id: number;
    userName: string;
    password: string;
    avatar: string;
    email: string;
    emailConfirm: AvailableStatus;
    phoneNumber: string;
    phoneConfirm: AvailableStatus;
    isParnert: boolean;
    createAt: string;
    updateAt: string;
    ipList: string;
    // booking: booking[];
    hotel: hotel[];
}

interface InitState {
    data: hotel | null,
    hotel: hotel | null
    list: hotel[] | null,
    getall: hotel[] | null,
    loading: boolean,
    hotelUser: hotel[] | null,

}


let initialState: InitState = {
    data: null,
    getall: null,
    hotel: null,
    list: null,
    loading: false,
    hotelUser: null,
}
const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.list = action.payload;

        },
        setAll: (state, action) => {
            state.getall = action.payload;

        },
        setHotel: (state, action) => {
            state.hotel = action.payload;
        },
        sethotelUser: (state, action) => {
            state.hotelUser = action.payload;

        },
        setDataHotel: (state, action) => {
            state.data = action.payload;
        },
        addData: (state, action) => {
            console.log("statelist", state.list);
            console.log("mn: ", action.payload);
            state.list.push(action.payload);


        },
        // updateStatus: (state, action) => {
        //     const index = state.list.findIndex(item => item.id === action.payload.id);
        //     if (index !== -1) {
        //         state.list[index] = action.payload;
        //     }
        // }
        updateStatus: (state, action) => {
            state.getall = state.getall && Object.values(state.getall)?.map(item => {
                if (item.id == action.payload.id) {
                    return action.payload
                } else {
                    return item
                }

            })
        }


        // setUserProduct: (state, action) => {
        //     state.userProduct = action.payload;
        // },
        // loadModal: (state) => {
        //     state.addModal = !state.addModal
        // },
        // addData: (state, action) => {
        //     state.list.unshift(action.payload)
        // },
        // update: (state, action) => {
        //     state.list = state.list.map(item => {
        //         if (item.id == action.payload.id) {
        //             return action.payload
        //         } else {
        //             return item
        //         }
        //     })
        // }, setList: (state, action) => {
        //     state.list = action.payload
        // }
    },
})

export const hotelReducer = hotelSlice.reducer;
export const hotelAction = {
    ...hotelSlice.actions,

};