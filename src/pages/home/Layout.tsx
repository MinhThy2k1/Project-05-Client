import { useEffect, useState } from "react";
import "./layout.scss"
import Listroom from "../roomhotel/Listroom"
import Listhotel from "../listhotel/Listhotel";
import { Header } from "../header/Header"
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../../service/apis';
import Navbar from "../navbar/Navbar";
import Login from "../authen/Login";
import Feature from "../feature/Feature";
import Footer from "../footer/Footer"
import Bodymess from "../chat/Bodymess"
import { userAction } from "../../store/slices/user.slice";
import Body from "../body/Body";
// import Test from "../body/Test";
export default function Layout() {
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false);
    // useEffect(() => {
    //     // if (!localStorage.getItem("token")) return
    //     try {
    //         api.authen.findMany()
    //             .then(async (res) => {
    //                 dispatch(userAction.setData(res.data.data))
    //                 console.log(res);
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //     } catch (err) {
    //         console.log(err);
    //     }
    //     console.log("da vao effect");
    // }, [])
    return (
        <div>
            <div className="layout_comtainer" >
                {/* <img src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="sdasd" /> */}
                <div className="box-navbar">
                    <Navbar />
                </div>
                <div>
                    <Header />
                </div>
                {modalVisible && <Login />}
                <div className="layout_body_container">
                    <div className="homeContainer">
                        <Feature />
                        <h1 className="homeTitle">Browse by property type</h1>
                        <Listhotel></Listhotel>
                        <h1 className="homeTitle">Homes guest love</h1>
                        <Listroom />

                    </div>

                    <Outlet />
                    {/* <Body></Body> */}
                    <div className="box-chats">
                        {/* <Bodymess></Bodymess> */}
                    </div>

                    {/* <Test></Test> */}
                </div>
                <Footer />
            </div>
        </div>
    )
}
