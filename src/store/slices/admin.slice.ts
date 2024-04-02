import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../service/apis"
type AvailableStatus = "active" | "inactive"
export type admin = {
    id: number;
    password: string;
    role: "admin";
    userName: string;
    permission: string;
    avatar: string;
    email: string;
    ipList: string;
    createTime: string;
    updateTime: string;
    emailConfirm: AvailableStatus;
}

interface InitState {
    data: admin | null,
    list: admin[] | null,
    loading: boolean

}
let initialState: InitState = {
    data: null,
    list: null,
    loading: false
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setList: (state, action) => {
            state.list = action.payload;
        },
        updateList: (state, action) => {
            if (state.list)
                return {
                    ...state,
                    list: state.list?.map(admin => {
                        if (admin.id == action.payload.id) {
                            return action.payload
                        }
                        return admin
                    })
                }
        },
        addMember: (state, action) => {
            state.list?.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAdmin.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchAdmin.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
    }
})
const fetchAdmin = createAsyncThunk(
    'user/validateToken',
    async () => {
        const res = await api.manager.getData({
            token: localStorage.getItem("tokenAdmin") || "null"
        });
        return res.data.data
    }
)
export const adminReducer = adminSlice.reducer;
export const adminAction = {
    ...adminSlice.actions,
    fetchAdmin
};