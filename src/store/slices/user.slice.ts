import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../service/apis"
export type AvailableStatus = "active" | "inactive"
export type StatusCitizen = "active" | "inactive" | "pending"
export type Partner = "Yes" | "No"
// type addModal = true | false
export type booking = {
    id: number;
    userId: number;
    startDate: string;
    endDate: string;
    totalPrice: number;
    paymentStatus: boolean;
    paymentMethod: number;
    bookAt: string;
    roomId: number;
    hotelId: number;
}

export type hotel = {
    id: number;
    userId: number;
    title: string;
    image: string;
    address: string;
    city: string;
    locationDescription: string;
    createAt: string;
    updateAt: string;


}

export type user = {
    id: number;
    userName: string;
    password: string;
    avatar: string;
    imgcitizen: string;
    email: string;
    emailConfirm: AvailableStatus;
    Phone: string;
    cccd: string;
    DayBrith: string;
    gioitinh: string;
    firstName: string;
    lastName: string;
    statusImg: StatusCitizen;
    phoneConfirm: AvailableStatus;
    isParnert: Partner;
    createAt: string;
    updateAt: string;
    ipList: string;
    booking: booking[];
    hotel: hotel[];
}
interface InitState {
    data: user | null,
    userProduct: user | null,
    list: user[],
    dataUserUp: user | null
    loading: boolean,
    User: user | null,

}
let initialState: InitState = {
    data: null,
    userProduct: null,
    list: [],
    User: null,
    dataUserUp: null,
    loading: false
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setUser: (state, action) => {
            state.User = action.payload
        },
        setDataUserUp: (state, action) => {
            state.dataUserUp = action.payload
        },
        setUserProduct: (state, action) => {
            state.userProduct = action.payload;
        },
        addData: (state, action) => {
            state.list.unshift(action.payload)
        },
        update: (state, action) => {
            state.list = state.list && Object.values(state.list)?.map(item => {
                if (item.id == action.payload.id) {
                    return action.payload
                } else {
                    return item
                }
            })
        }, setList: (state, action) => {
            state.list = action.payload
        },
        updateUser: (state, action) => {
            state.list = state.list && Object.values(state.list)?.map(item => {
                if (item.id == action.payload.id) {
                    return action.payload
                } else {
                    return item
                }

            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})
const fetchUser = createAsyncThunk(
    'user/featchData',
    async (token: string) => {
        let res = await api.authen.getData({
            token
        })


        return res.data.data
    }
)
export const userReducer = userSlice.reducer;
export const userAction = {
    ...userSlice.actions,
    fetchUser
};