import React, { useEffect, useState } from 'react'
import { api } from '../../service/apis';
import "./hotel.scss"
import Footer from '../footer/Footer';
import Navbar from "../navbar/Navbar";
import { Header } from "../header/Header"
import axios from 'axios';
import { Modal } from 'antd'
import { Button } from 'react-bootstrap'
import { hotelAction } from '../../store/slices/hotel.slice';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../store';
import { Link, Navigate, useParams } from 'react-router-dom';
import { roomAction } from '../../store/slices/room.slice';
import { userAction } from '../../store/slices/user.slice';
export default function Hotel() {
    const [display, setDisplay] = useState(false)
    const [idRoom, setIdRoom] = useState(0);
    const [findHotel, setFindHotel] = useState([])
    const [currentRoom, setCurrentRoom] = useState(null)
    // const [Userid, setuserid] = useState(0);
    const [currentHotel, setCurrentHotel] = useState(null);
    console.log("currenthotel", currentHotel);

    const dispatch = useDispatch()
    const hotelStore = useSelector((store: StoreType) => store.hotelStore.data)
    const roomStore = useSelector((store: StoreType) => store.roomStore)
    const userStore = useSelector((store: StoreType) => store.userStore)
    console.log("userstorefind", userStore);

    console.log("roomstore", roomStore);

    interface Image {
        imgUrl: string;
    }
    const Userid = currentHotel?.user?.id
    console.log("iduser", Userid);

    const { id } = useParams()
    const [slideNumber, setSlideNumber] = useState(0)
    const [open, setOpen] = useState(false)
    const handleOpen = (index) => {
        setSlideNumber(index);
        setOpen(true);
    }
    const handleMove = (clickMove: any) => {
        let newSliceNumber: any;
        if (clickMove == "l") {
            newSliceNumber = slideNumber == 0 ? 5 : slideNumber - 1;
        } else {
            newSliceNumber = slideNumber == 5 ? 0 : slideNumber + 1;
        }
        setSlideNumber(newSliceNumber)
    }
    useEffect(() => {
        axios.get(`http://127.0.0.1:4000/api/v1/room/findroom/${idRoom}`).then((res) => {
            setCurrentRoom(res.data.data);
            // dispatch(roomAction.setDataRoom(res.data.data))
        })
    }, [idRoom])
    useEffect(() => {
        axios.get(`http://127.0.0.1:4000/api/v1/room/${id}`).then((res) => {
            dispatch(roomAction.setRoomHotel(res.data.data))
            console.log("1");
        })
    }, [])
    useEffect(() => {
        axios.get(`http://127.0.0.1:4000/api/v1/hotel/find/${id}`).then((res) => {
            setCurrentHotel(res.data.data);
            // dispatch(roomAction.setDataRoom(res.data.data))
        })
    }, [])

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <div className='box-nav'>
                <Navbar></Navbar>
            </div>
            <Header type='list' />
            {
                <div className='hotelContainer'>
                    {open && <div className="slider">
                        <i className="fa-solid fa-circle-xmark close" onClick={() => setOpen(false)}></i>
                        <i className="fa-solid fa-circle-chevron-left arrow " onClick={() => handleMove("l")} ></i>
                        <div className='sliderWrapper'>
                            <img src={currentHotel.img[slideNumber].imgUrl} alt="" className="sliderImg" />
                        </div>
                        <i className="fa-solid fa-circle-chevron-right arrow " onClick={() => handleMove("r")} ></i>
                    </div>}
                    <div className='hotelWrapper'>
                        <div className="bookNow">
                            <div className='boxnow-main'>
                                <div className='booknow-img'>
                                    <img src={currentHotel?.user?.avatar} alt="" />
                                </div>
                                <div>
                                    <div className='box-user-booknow'>
                                        <p>{currentHotel?.user?.userName}</p>
                                    </div>
                                </div>
                                <div className='booknow-button'>
                                    <Link to={`/info-contact/${currentHotel?.user.id}`} >
                                        <button>Xem trang <i className="fa-solid fa-angle-right"></i></button>
                                    </Link>

                                </div>
                            </div>
                            <div className='box-user-img-booknow'>
                                <img src="https://static.chotot.com/storage/default_images/pty/pro-pty-icon.svg" alt="" /><p>Đối tác</p>
                            </div>
                            <div className='box-user-phone'>
                                <button>Liên hệ <i className="fa-solid fa-angle-right"></i> <i className="fa-solid fa-phone"></i> {currentHotel?.user?.Phone} </button>
                            </div>

                        </div>
                        <h1 className='hotelTitle'>{currentHotel?.name}</h1>
                        <div className='hotelAddress'>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>{currentHotel?.address}</span>
                        </div>
                        <span className='hotelDistance'>
                            Excellent location -{currentHotel?.distance}m from center
                        </span>
                        <span className='hotelPriceHighlight'>
                            Book a stay over {currentHotel?.cheapestprice} at this property and get a free airport taxi
                        </span>
                        <div className='hotelImages'>
                            {currentHotel?.img?.map((photo, index) => (
                                <div className='hotelImgWrapper'>
                                    <img onClick={() => {
                                        handleOpen(index)
                                    }} src={photo.imgUrl} alt="" className="hotelImg" />
                                </div>
                            ))}
                        </div>
                        <div className='hotelDetails'>
                            <div className="hotelDetailsTexts">
                                <h1 className='hotelTitle'>{currentHotel?.type}</h1>
                                <p className="hotelDesc">
                                    {currentHotel?.locationDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className='show-room-main'>
                <h3>Danh sách phòng</h3>
                {
                    roomStore.getRoomByHotelId && Object.values(roomStore.getRoomByHotelId)?.map((item, index) => {
                        // if (item.status == selectedActive) {   
                        // }
                        return (
                            <div className='show-room'>
                                <div className='room-title'>
                                    <h2 className='room-title-item'>
                                        {item.title}
                                    </h2>

                                </div>
                                <div className='room-content'>
                                    <div className='img-room'>
                                        <div className='img-1'>
                                            {item && item.imgroom && item.imgroom.length > 0 && (

                                                <img
                                                    // key={}
                                                    onClick={() => {
                                                        // Xử lý khi người dùng nhấp vào ảnh
                                                    }}
                                                    src={item.imgroom[0]?.imgUrl}
                                                    alt={`Image ${slideNumber}`}
                                                    className="roomImg"
                                                />

                                            )}
                                        </div>
                                        <div className='img-room-down'>
                                            <div className='img-2'>
                                                {item && item.imgroom && item.imgroom.length > 0 && (

                                                    <img
                                                        // key={}
                                                        onClick={() => {
                                                            // Xử lý khi người dùng nhấp vào ảnh
                                                        }}
                                                        src={item.imgroom[1]?.imgUrl}
                                                        alt={`Image ${slideNumber}`}
                                                        className="roomImg"
                                                    />

                                                )}
                                                {item && item.imgroom && item.imgroom.length > 0 && (

                                                    <img
                                                        // key={}
                                                        onClick={() => {
                                                            // Xử lý khi người dùng nhấp vào ảnh
                                                        }}
                                                        src={item.imgroom[2]?.imgUrl}
                                                        alt={`Image ${slideNumber}`}
                                                        className="roomImg"
                                                    />

                                                )}
                                                {item && item.imgroom && item.imgroom.length > 0 && (

                                                    <img
                                                        // key={}
                                                        onClick={() => {
                                                            // Xử lý khi người dùng nhấp vào ảnh
                                                        }}
                                                        src={item.imgroom[3]?.imgUrl}
                                                        alt={`Image ${slideNumber}`}
                                                        className="roomImg"
                                                    />

                                                )}
                                            </div>
                                            <div className='button-show'>
                                                <button onClick={() => {
                                                    setIdRoom(item.id)
                                                    setDisplay(true)
                                                    setSlideNumber(index);
                                                }}>Xem chi tiết phòng</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='info-room-main'>

                                        <div className='info-room'>
                                            <div className='info-title'>
                                                <h2>{item.title}</h2>
                                            </div>
                                            <div className='info-content'>
                                                <div className='info-content-item'>
                                                    <p><i className="fa-solid fa-bed"></i> {item.bedCount} giường</p>
                                                </div>
                                                <div className='info-content-item'>
                                                    <p><i className="fa-solid fa-person"></i> {item.guestCount} khách</p>
                                                </div>
                                                <div className='info-content-item' >
                                                    <p> <i className="fa-solid fa-bath"></i> {item.bathroomCount} phòng tắm</p>

                                                </div>
                                            </div>
                                            <div className='box-info-des-main'>
                                                <div className='info-des'>
                                                    <ul style={{ alignItems: "center" }} >
                                                        <li>{item?.roomService ? <span><i className="fa-solid fa-check"></i> <i className="fa-solid fa-bell-concierge"></i> serivce</span> : <span><i className="fa-solid fa-xmark"></i> <i className="fa-solid fa-bell-concierge"></i> service</span>}</li>
                                                        <li>{item?.freewifi ? <span><i className="fa-solid fa-check"></i> <i className="fa-solid fa-wifi"></i> freewifi</span> : <span><i className="fa-solid fa-xmark"></i><i className="fa-solid fa-wifi"></i> freewifi</span>}</li>
                                                        <li> {item?.TV ? <span><i className="fa-solid fa-check"></i> <i className="fa-solid fa-tv"></i> TV</span> : <span><i className="fa-solid fa-xmark"></i><i className="fa-solid fa-tv"></i> TV</span>}</li>
                                                    </ul>
                                                    <ul style={{ alignItems: "center" }} >
                                                        <li><img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/a/ac4257c709f6621e4c315f641f60202f.svg" alt="" />Không hoàn tiền</li>
                                                        <li><img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/a/ac4257c709f6621e4c315f641f60202f.svg" alt="" />Không đổi lịch</li>
                                                        <li><img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/a/ac4257c709f6621e4c315f641f60202f.svg" alt="" />Không đổi trả</li>
                                                    </ul>
                                                    <ul>
                                                        <li>{item.roomPrice} VND </li>
                                                        <li style={{ color: 'gray' }}>Chưa bao gồm thuế và phí</li>
                                                        <li className='button-click-up' ><button onClick={() => {
                                                            handleScrollToTop()
                                                        }} style={{ cursor: "pointer" }}>Liên hệ ngay</button></li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <Modal className='box-modal-main'
                visible={display} // Sử dụng prop visible thay vì show
                onCancel={() => setDisplay(false)} // Sử dụng onCancel thay vì onHide
                footer={[ // Sử dụng prop footer để tạo footer
                    <Button style={{ display: 'none' }} key="close" typeof="primary" onClick={() => setDisplay(false)}>
                        close
                    </Button>
                ]}
            >
                <div className='box-modal-room'>
                    <div className='item_container_title'>
                        <div className='box-item-title'>
                            <div className='box-head-room'>
                                <div>
                                    <h3>{currentRoom?.title}</h3>
                                </div>
                                <div>
                                    <h3>${currentRoom?.roomPrice}</h3>
                                </div>

                            </div>

                            <h3>Thông tin phòng</h3>
                            <div className='box-info-room'>
                                <div>
                                    <p><i className="fa-solid fa-bed"></i> {currentRoom?.bedCount} giường</p>
                                </div>
                                <div>
                                    <p><i className="fa-solid fa-person"></i> {currentRoom?.guestCount} khách </p>
                                </div>
                                <div>
                                    <p><i className="fa-solid fa-bath"></i> {currentRoom?.bathroomCount} phòng tắm</p>
                                </div>
                            </div>

                            {/* <div>
                                    <i className="fa-solid fa-circle-chevron-left arrow-l" onClick={() => handleMove('prev')}></i>
                                    {currentRoom && currentRoom.imgroom && currentRoom.imgroom.length > 0 && (
                                        <div className='roomhotelwraper'>
                                            {Object.values(currentRoom.imgroom[slideNumber])?.map((image: any, index: number) => (
                                                <img
                                                    // key={}
                                                    onClick={() => {
                                                        // Xử lý khi người dùng nhấp vào ảnh
                                                    }}
                                                    src={image.imgroom[slideNumber]?.imgUrl}
                                                    alt={`Image ${index}`}
                                                    className="roomImg"
                                                />
                                            ))}
                                        </div>
                                    )}
                                    <i className="fa-solid fa-circle-chevron-right arrow-r" onClick={() => handleMove('next')}></i>
                                </div> */}
                            {/* ///slide hien 1 hinh anh cua 1 doi tuong ko phai la mang + de kich hoat duoc slide con phai setslide ngay khu vuc luc kich hoat modal de no lay duoc gia tri vi tri cua slide neu ko slide se bi undefine hoac ko doc duoc 0 */}
                            <div>
                                <i className="fa-solid fa-circle-chevron-left arrow-l" onClick={() => handleMove('prev')}></i>
                                {currentRoom && currentRoom.imgroom && currentRoom.imgroom.length > 0 && (
                                    <div className='roomhotelwraper'>
                                        <img
                                            // key={}
                                            onClick={() => {
                                                // Xử lý khi người dùng nhấp vào ảnh
                                            }}
                                            src={currentRoom.imgroom[slideNumber]?.imgUrl}
                                            alt={`Image ${slideNumber}`}
                                            className="roomImg"
                                        />
                                    </div>
                                )}
                                <i className="fa-solid fa-circle-chevron-right arrow-r" onClick={() => handleMove('next')}></i>
                            </div>
                            {/* //////////////////////////////////// can bao ton */}
                            <div>
                                <div>
                                    <h4>tiện nghi phòng/dịch vụ</h4>
                                    <div className='box-info-service'>
                                        <div className='box-item-serivice'>
                                            <div>
                                                {currentRoom?.TV ? <span><i className="fa-solid fa-check"></i> <i className="fa-solid fa-tv"></i> TV</span> : <span><i className="fa-solid fa-xmark"></i><i className="fa-solid fa-tv"></i> TV</span>}
                                            </div>
                                            <div>
                                                <div>
                                                    {currentRoom?.freewifi ? <span><i className="fa-solid fa-check"></i> <i className="fa-solid fa-wifi"></i> freewifi</span> : <span><i className="fa-solid fa-xmark"></i><i className="fa-solid fa-wifi"></i> freewifi</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='box-item-serivice'>
                                            <div>
                                                <div>
                                                    {currentRoom?.roomService ? <span><i className="fa-solid fa-check"></i> <i className="fa-solid fa-bell-concierge"></i> serivce</span> : <span><i className="fa-solid fa-xmark"></i> <i className="fa-solid fa-bell-concierge"></i> service</span>}
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    {currentRoom?.beachView == "Yes" ? <span><i className="fa-solid fa-check"> </i> <i className="fa-solid fa-eye"></i> beachview</span> : <span><i className="fa-solid fa-xmark"></i> <i className="fa-solid fa-eye"></i> beachview</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='box-item-serivice' >
                                            <div>
                                                <div>
                                                    {currentRoom?.mountainView == "Yes" ? <span><i className="fa-solid fa-check"> </i> <i className="fa-solid fa-eye"></i> mountainview</span> : <span><i className="fa-solid fa-xmark"></i> <i className="fa-solid fa-eye"></i> mountainview</span>}
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    {currentRoom?.cityView == "Yes" ? <span><i className="fa-solid fa-check"> </i> <i className="fa-solid fa-eye"></i> cityView</span> : <span><i className="fa-solid fa-xmark"></i> <i className="fa-solid fa-eye"></i> cityView</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4>Mô tả chi tiết</h4>
                                        <div>
                                            <p>{currentRoom?.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>
            <Footer></Footer>
        </div >
    )
}
