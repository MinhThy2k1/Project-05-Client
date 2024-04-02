import authenApi from './authen'
import { userApi } from './user.api'
import managerApi from './admin/admin'
import hotelApi from "./hotel/hotel"
import roomApi from "./room/room"
import './axios.instance'
export const api = {
    manager: managerApi,
    authen: authenApi,
    hotel: hotelApi,
    room: roomApi,
    userApi

}