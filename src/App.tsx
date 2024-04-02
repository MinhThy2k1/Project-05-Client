import { useEffect, useState } from "react";
import RouteSetup from "./routes/RouteSetup"
import { api } from "./service/apis";
import { StoreType } from "./store";
import { hotelAction } from "./store/slices/hotel.slice";
import { useSelector, useDispatch } from "react-redux";
import { roomAction } from "./store/slices/room.slice";
import { userAction } from "./store/slices/user.slice";
import axios from "axios";

function App() {
  const userStore = useSelector((store: StoreType) => store.userStore)
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) { // Kiểm tra xem token có tồn tại không
      api.authen.getData({ token })
        .then(res => {
          if (res.status == 200) {
            dispatch(userAction.setData(res.data.data));
          } else {
            localStorage.removeItem("token")
            dispatch(userAction.setData(null));
          }
        })
        .catch(err => {
          dispatch(userAction.setData(null));
          localStorage.removeItem('token');
        });
    } else {
      dispatch(userAction.setData(null)); // Không có token, set user data thành null
    }
  }, []);
  // useEffect(() => {
  //   try {
  //     api.hotel.findUnique(id)
  //       .then(async (res) => {
  //         dispatch(hotelAction.setDataHotel(res.data.data))
  //         console.log(res);

  //       })
  //       .catch(err => {

  //       })
  //   } catch (err) {

  //   }
  // }, [])

  // useEffect(() => {
  //   try {
  //     api.authen.getUserById(id)
  //       .then(async (res) => {
  //         dispatch(hotelAction.setData(res.data.data))
  //       })
  //       .catch(err => {
  //         console.log(err);


  //       })
  //   } catch (err) {

  //   }
  // }, [])
  useEffect(() => {
    try {
      api.hotel.findManys()
        .then(async (res) => {
          dispatch(hotelAction.setAll(res.data.data))
        })
        .catch(err => {
          console.log(err);


        })
    } catch (err) {

    }
  }, [])
  useEffect(() => {
    try {
      api.hotel.findMany()
        .then(async (res) => {
          dispatch(hotelAction.setData(res.data.data))
        })
        .catch(err => {
          console.log(err);


        })
    } catch (err) {

    }
  }, [])
  useEffect(() => {
    try {
      api.room.findMany()
        .then(async (res) => {
          dispatch(roomAction.setData(res.data.data))
        })
        .catch(err => {

        })
    } catch (err) {
    }
  }, [])
  useEffect(() => {
    try {
      api.authen.findMany()
        .then(async (res) => {
          dispatch(userAction.setList(res.data.data))
        })
    } catch (err) {
    }
  }, [])
  return (
    <>
      <RouteSetup></RouteSetup>
    </>
  )
}
export default App