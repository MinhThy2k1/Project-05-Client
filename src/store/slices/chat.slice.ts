import { createSlice } from "@reduxjs/toolkit";
import { Chat } from "../../service/chat-socket";

interface ChatInitState {
    data: null | Chat[],
    loading: boolean
}

let initialState: ChatInitState = {
    data: null,
    loading: false
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {

    }
})

export const chatReducer = chatSlice.reducer;
export const chatAction = {
    ...chatSlice.actions
};