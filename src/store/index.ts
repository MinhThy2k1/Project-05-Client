import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer, userAction } from "./slices/user.slice";
import { adminReducer, adminAction } from "./slices/admin.slice";
import { chatReducer } from "./slices/chat.slice";
import { hotelReducer } from "./slices/hotel.slice";
import { roomReducer } from "./slices/room.slice";
const RootReducer = combineReducers({
    userStore: userReducer,
    adminStore: adminReducer,
    chatStore: chatReducer,
    hotelStore: hotelReducer,
    roomStore: roomReducer,
})
export type StoreType = ReturnType<typeof RootReducer>;


export const store = configureStore({
    reducer: RootReducer
})

store.dispatch(userAction.fetchUser())
store.dispatch(adminAction.fetchAdmin())

export default store