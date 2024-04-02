import React, { useEffect, useState } from 'react';
import Navbar from '../../navbar/Navbar';
import "./infocontact.scss";
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../footer/Footer'
import { Link, Navigate, useParams } from 'react-router-dom';
import { userAction } from '../../../store/slices/user.slice';
import axios from 'axios';
import { hotelAction } from '../../../store/slices/hotel.slice';
import { StoreType } from '../../../store';
export default function Infocontact() {
    const hotelStore = useSelector((store: StoreType) => store.hotelStore)
    const userStore = useSelector((store: StoreType) => store.userStore)
    console.log(hotelStore);


    const [currentUser, setCurrentUser] = useState(null)
    console.log("currentuser", currentUser);
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log("id", id);
    useEffect(() => {
        axios.get(`http://127.0.0.1:4000/api/v1/user/${id}`).then((res) => {
            setCurrentUser(res.data.data)

        })
    }, [])
    useEffect(() => {
        axios.get(`http://127.0.0.1:4000/api/v1/hotel/finduser/${id}`).then((res) => {
            dispatch(hotelAction.setData(res.data.data))
            console.log("res", res);

            console.log("1");
        })
    }, [])
    return (
        <div>
            <div className='box-nav'>
                <Navbar></Navbar>
            </div>
            <h3 style={{ marginLeft: "17%" }}>Trang đối tác của {currentUser?.userName}</h3>
            <div className='box-user-contact-main'>
                <div className='box-user-contact'>
                    <div className='user-contact'>
                        <div className='user-img-up'>
                            <img src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474075mJQ/hinh-nen-xam-trang-tuyet-dep_095634010.jpg" alt="" />
                        </div>
                        <div className='user-contact-img'>
                            <img src={currentUser?.avatar} alt="" />
                        </div>
                        <div className='user-contact-name'>
                            <h3> {currentUser?.userName}</h3>
                        </div>
                        <div className='user-contact-address'>
                            <h3>Địa chỉ:Quận 7</h3>
                        </div>

                    </div>
                </div>
                <div className='box-user-owner-hotel'>
                    <div className='user-hotel'>
                        <h3>Đang sở hữu khách sạn</h3>
                    </div>
                    <div className='user-hotel-box'>
                        {
                            hotelStore.list && Object.values(hotelStore.list)?.map((item, index) => (
                                <div style={{ cursor: "pointer" }} onClick={() => {
                                    window.location.href = `/hotel/${item.id}`
                                }
                                } key={index}>
                                    <div className="user-hotel-list">
                                        <div className='user-hotel-list-box'>
                                            <div className='user-hotel-img'>
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className='user-hotel-name'>
                                                <h4>{item.name}</h4>
                                                <p>{item.city}</p>
                                                <p>type:{item.type}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
            <Footer></Footer>
        </div >
    )
}
