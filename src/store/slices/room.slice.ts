import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../service/apis"
type AvailableStatus = "active" | "inactive"
export type StatusSelect = "Yes" | "No"
type addModal = true | false

export type room = {
    id: number;
    title: string;
    description: string;
    bedCount: number;
    guestCount: number;
    bathroomCount: number;
    image: string;
    roomPrice: number;
    adult: string;
    child: string;
    freewifi: StatusSelect;
    roomService: StatusSelect;
    TV: StatusSelect;
    beachView: StatusSelect;
    mountainView: StatusSelect;
    cityView: StatusSelect;
    hotelId: StatusSelect;
    imgroom: string;
}

interface InitState {
    data: room | null,
    userProduct: room | null,
    addModal: addModal,
    list: room[],
    getRoomByHotelId: room[],
    dataroom: room | null,
    loading: boolean

}
let initialState: InitState = {
    data: null,
    userProduct: null,
    addModal: false,
    list: [],
    getRoomByHotelId: [],
    dataroom: null,
    loading: false
}
const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.list = action.payload;
        },
        setRoomHotel: (state, action) => {
            state.getRoomByHotelId = action.payload;
        },
        setDataRoom: (state, action) => {
            state.dataroom = action.payload;
        },
        addData: (state, action) => {
            state.list?.push(action.payload);
        },
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

export const roomReducer = roomSlice.reducer;
export const roomAction = {
    ...roomSlice.actions,

};