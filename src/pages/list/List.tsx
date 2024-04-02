import React from 'react'
import Searchitem from '../searchitem/Searchitem';
import "./list.scss"
import { api } from '../../service/apis';
import Navbar from "../navbar/Navbar";
import { Header } from "../header/Header"
import { Link, useLocation, useNavigate } from "react-router-dom"
import ChatBox from "../chat/chat-box";
import { useSpring, animated } from "react-spring";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { socketChat } from "../../service/chat-socket";
import { DateRange } from "react-date-range";
import { logout } from '../../service/firebase';
import { DownOutlined } from '@ant-design/icons';
import { MenuProps, Dropdown, Space, Modal } from "antd"
import { StoreType } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../store/slices/user.slice";
import axios from 'axios';
import hotel from '../../service/apis/hotel/hotel';
import { hotelAction } from '../../store/slices/hotel.slice';
import Footer from '../footer/Footer';
export default function List() {
    const location = useLocation()
    const dispatch = useDispatch()
    const hotelStore = useSelector((store: StoreType) => store.hotelStore)
    console.log("hotelstorelist", hotelStore);

    const [openDate, setOpenDate] = useState(false);
    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state.dates);
    const [loaded, setLoaded] = useState(false);
    const [options, setOptions] = useState(location.state.options);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
    const [Hotels, setHotels] = useState([]);
    console.log("destination", destination);
    console.log("opstion", options);
    console.log("date", dates);




    // useEffect(() => {
    //     async function fetchHotelCounts() {
    //         try {
    //             const response = await axios.get(`http://127.0.0.1:4000/api/v1/hotel/findbycity/${destination}?min=${min || 0}&max=${max || 999}`);
    //             console.log("vao day 2");
    //             dispatch(hotelAction.setData(response.data.data))

    //         } catch (err) {
    //             return err
    //         }
    //     }
    //     fetchHotelCounts();

    // }, [destination]);
    //    
    const userStore = useSelector((store: StoreType) => store.userStore)

    const chatStore = useSelector((store: StoreType) => store.chatStore)
    useEffect(() => {
        axios.get(`http://127.0.0.1:4000/api/v1/hotel/findcity/${destination}`).then((res) => {
            console.log("vao day 1 ?");
            dispatch(hotelAction.setAll(res.data.data))
            console.log("hotelstore.getall", hotelStore.getall);

            // dispatch(roomAction.setDataRoom(res.data.data))
        })
    }, [])
    const handleClick = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:4000/api/v1/hotel/findbycity/${destination}?min=${min || 0}&max=${max || 999}`);
            console.log("res", res);
            console.log("vao day 4");
            dispatch(hotelAction.setAll(res.data.data));
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu khách sạn:', error);
        }
        console.log("da vao search");

    };
    return (
        <div>
            <div className='box-nav'>
                <Navbar></Navbar>
            </div>
            <Header type='list' />
            <div className="listContainer">
                <div className="listWrapper" >
                    <div className="listSearch" >
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label>Destination</label>
                            <input placeholder={destination} type="text" />
                        </div>
                        <div className="lsItem">
                            <label>Check-in Date</label>
                            <span onClick={() => setOpenDate(!openDate)}>{`${format(
                                dates[0].startDate,
                                "MM/dd/yyyy"
                            )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                            {openDate && (
                                <DateRange
                                    onChange={(item) => setDates([item.selection])}
                                    minDate={new Date()}
                                    ranges={dates}
                                />
                            )}
                        </div>
                        <div className="lsItem">
                            <label>Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Min price <small>per night</small>
                                    </span>
                                    <input
                                        type="number"
                                        onChange={(e) => setMin(e.target.value)}
                                        className="lsOptionInput"
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Max price <small>per night</small>
                                    </span>
                                    <input
                                        type="number"
                                        onChange={(e) => setMax(e.target.value)}
                                        className="lsOptionInput"
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Adult</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="lsOptionInput"
                                        placeholder={options.adult}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Children</span>
                                    <input
                                        type="number"
                                        min={0}
                                        className="lsOptionInput"
                                        placeholder={options.children}
                                    />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Room</span>
                                    <input
                                        type="number"
                                        min={1}
                                        className="lsOptionInput"
                                        placeholder={options.room}
                                    />
                                </div>
                            </div>
                        </div>
                        <button onClick={() => {
                            handleClick()
                        }}>Search</button>
                    </div>
                    <div className="listResult">

                        {
                            hotelStore.getall && Object.values(hotelStore.getall)?.map((item, index) => (
                                item.status === "active" && (
                                    <div key={item.id}>
                                        <div className="searchItem">
                                            <img src={item.image} alt="" className="siImg" />
                                            <div className="siDesc">
                                                <h1 className="siTitle">{item.name}</h1>
                                                <span className="siDistance">{item.distance}m from center</span>
                                                <span className="siTaxiOp">Free airport taxi</span>
                                                <span className="siSubtitle">Studio Apartment with Air conditioning</span>
                                                <span className="siFeatures">{item.locationDescription}</span>
                                                <span className="siCancelOp">Free cancellation </span>
                                                <span className="siCancelOpSubtitle">You can cancel later, so lock in this great price today!</span>
                                            </div>
                                            <div className="siDetails">
                                                <div className="siDetailTexts">
                                                    <span className="siPrice">${item.cheapestprice}</span>
                                                    <span className="siTaxOp">Includes taxes and fees</span>
                                                    <Link to={`/hotel/${item.id}`}>
                                                        <button className="siCheckButton">See availability</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))
                        }
                    </div>
                </div>

            </div>
            <Footer></Footer>

        </div>
    )
}
