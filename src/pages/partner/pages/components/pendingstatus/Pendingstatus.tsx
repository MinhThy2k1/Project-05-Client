import React, { useEffect, useState } from 'react'
import "./pendingstatus.scss"
import { useSelector, useDispatch } from 'react-redux'
import { StoreType } from '../../../../../store'
import axios from 'axios'
import { hotelAction } from '../../../../../store/slices/hotel.slice'
import { roomAction } from '../../../../../store/slices/room.slice'
import { Modal } from 'antd'
import { Button } from 'react-bootstrap'
import { Link, Navigate, useParams } from 'react-router-dom'
export enum hotelStatus {
    Inactive = "inactive",
    Active = "active",
    Delete = "denied",
}
export default function Pendingstatus() {
    const [display, setDisplay] = useState(false)
    const [displayroom, setDisplayRoom] = useState(false)
    const dispatch = useDispatch()
    const [idHotel, setIdHotel] = useState(0);
    const [idRoom, setIdRoom] = useState(0);
    const [currentRoom, setCurrentRoom] = useState(null)
    const [currentHotelId, setCurrentHotelId] = useState(null)
    const [currentHotel, setCurrentHotel] = useState(null);
    const [selectedActive, setSelectedActive] = useState("active")
    const [status, setStatus] = useState("")
    const [slideNumber, setSlideNumber] = useState(0)
    const userStore = useSelector((store: StoreType) => store.userStore)
    const hotelStore = useSelector((store: StoreType) => store.hotelStore)
    const roomStore = useSelector((store: StoreType) => store.roomStore)
    console.log("hotelstore", hotelStore);

    const userId = userStore.data.id;
    console.log("userid", userId);

    useEffect(() => {
        axios.get(`http://127.0.0.1:4000/api/v1/hotel/finduser/${userId}`).then((res) => {
            setCurrentHotel(res.data.data);
            dispatch(hotelAction.sethotelUser(res.data.data))


        })
    }, [])
    // useEffect(() => {
    //     axios.get(`http://127.0.0.1:4000/api/v1/hotel/${idHotel}`).then((res) => {
    //         dispatch(hotelAction.setHotel(res.data.data))
    //         console.log(res);
    //     })
    // }, [idHotel])
    useEffect(() => {
        axios.get(`http://127.0.0.1:4000/api/v1/room/${idHotel}`).then((res) => {
            dispatch(roomAction.setRoomHotel(res.data.data))
            console.log("1");
            console.log(res);
        })
    }, [idHotel])
    // api lay room theo idroom
    useEffect(() => {
        axios.get(`http://127.0.0.1:4000/api/v1/room/findroom/${idRoom}`).then((res) => {
            setCurrentRoom(res.data.data);
            // dispatch(roomAction.setDataRoom(res.data.data))
        })
    }, [idRoom])

    const handleMove = (clickMove: any) => {
        let newSliceNumber: any;
        if (clickMove == "l") {
            newSliceNumber = slideNumber == 0 ? 5 : slideNumber - 1;
        } else {
            newSliceNumber = slideNumber == 5 ? 0 : slideNumber + 1;
        }
        setSlideNumber(newSliceNumber)
    }
    return (
        <div>
            <>

                <div>
                    <select value={selectedActive} style={{ width: 120 }} onChange={(e) => setSelectedActive(e.target.value)}>
                        <option value={hotelStatus.Active}>{hotelStatus.Active}</option>
                        <option value={hotelStatus.Inactive}>{hotelStatus.Inactive}</option>
                        <option value={hotelStatus.Delete}>{hotelStatus.Delete}</option>
                    </select>
                </div>
                <h2>Manager Hotel Contact</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name/Hotel</th>
                            <th>Type</th>
                            <th>Image</th>
                            <th>Img</th>
                            <th>Address</th>
                            <th>Distance</th>
                            <th>City</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Tool</th>
                            {selectedActive == hotelStatus.Delete && <th>Reason</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            hotelStore.hotelUser && Object.values(hotelStore.hotelUser)?.map((item, index) => {
                                if (item.status == selectedActive) {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <span className="res-head">Ids</span>{item.id}
                                            </td>
                                            <td>
                                                <span className="res-head">Ids</span>{item.name}
                                            </td>
                                            <td>
                                                <span className="res-head">Ids</span>{item.type}
                                            </td>
                                            <td>
                                                <span className="res-head">Ids</span> <img src={item.image} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                            </td>
                                            <td>
                                                <span className="res-head">Ids</span>
                                                {hotelStore.hotelUser && Object.values(hotelStore.hotelUser)?.map((hotel: any) => (
                                                    <div className='hotelImgWrapper' key={hotel.id}>
                                                        {item.id == hotel.id && hotel.img && hotel.img.length > 0 && hotel.img.map((image: any, index: number) => (
                                                            <img
                                                                key={index}
                                                                onClick={() => {
                                                                    // Xử lý khi người dùng nhấp vào ảnh
                                                                }}
                                                                src={image.imgUrl} // Sử dụng đường dẫn đến ảnh từ mảng img
                                                                alt={`Image ${index}`}
                                                                className="hotelImg"
                                                            />
                                                        ))}
                                                    </div>
                                                ))}
                                            </td>
                                            <td>
                                                <span className="res-head">Ids</span>{item.address}
                                            </td>
                                            <td>
                                                <span className="res-head">Ids</span>{item.distance}
                                            </td>
                                            <td>
                                                <span className="res-head">Ids</span>{item.city}
                                            </td>
                                            <td>
                                                <span className="res-head">Ids</span><img src={item.contact} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                            </td>
                                            <td>
                                                <span className="res-head">Ids</span>{item.status}
                                            </td>
                                            <td className='box-tool'>
                                                {!hotelStatus.Active ? (
                                                    <>
                                                        <Link to={`/partner/create-room/${item.id}`}>
                                                            <button onClick={() => {

                                                            }} className="siCheckButton">CreateRoom</button>
                                                        </Link>
                                                        <button>Remove</button>
                                                        <button onClick={() => {
                                                            setIdHotel(item.id)
                                                            console.log(item.id);
                                                            setDisplayRoom(true);
                                                        }}>Show</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link to={`/partner/create-room/${item.id}`}>
                                                            <button onClick={() => {
                                                                setIdHotel(item.id)
                                                            }} className="siCheckButton">CreateRoom</button>
                                                        </Link>
                                                        <button className='item-tool' disabled>Remove</button>
                                                        <button onClick={() => {
                                                            setIdHotel(item.id)
                                                            setDisplayRoom(true);
                                                        }}>Show</button>
                                                    </>
                                                )}
                                            </td>
                                            {hotelStatus.Delete && (
                                                <td>
                                                    <>
                                                        <span className="res-head">reason</span>
                                                        {/* {item.reason} */}
                                                    </>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                }

                            })
                        }
                    </tbody>
                </table >
                {/* ///showroom/// */}
                {
                    displayroom && <>
                        <h2 style={{ cursor: "pointer" }} onClick={() => {
                            setDisplayRoom(false)
                        }}>Manager Room <i style={{ color: "crimson" }} className="fa-solid fa-circle-xmark"></i></h2>

                        <table className="table table-room">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Image</th>
                                    <th>ImgRoom</th>
                                    <th>title</th>
                                    <th>bedCount</th>
                                    <th>guestCount</th>
                                    <th>bathroomCount</th>
                                    <th>roomPrice</th>
                                    <th>freewifi</th>
                                    <th>roomService</th>
                                    <th>TV</th>
                                    <th>beachView</th>
                                    <th>mountainView</th>
                                    <th>cityView</th>
                                    <th>Tool</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    roomStore.getRoomByHotelId && Object.values(roomStore.getRoomByHotelId)?.map((item, index) => {
                                        // if (item.status == selectedActive) {   
                                        // }
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <span className="res-head">Ids</span>{item.id}
                                                </td>
                                                <td>
                                                    <span className="res-head">Ids</span> <img src={item.image} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                                </td>
                                                <td>
                                                    <span className="res-head">Ids</span>
                                                    {roomStore.list && Object.values(roomStore.list)?.map((room: any) => (
                                                        <div className='hotelImgWrapper' key={room.id}>
                                                            {item.id == room.id && room.imgroom && room.imgroom.length > 0 && room.imgroom.map((image: any, index: number) => (
                                                                <img
                                                                    key={index}
                                                                    onClick={() => {
                                                                        // Xử lý khi người dùng nhấp vào ảnh
                                                                    }}
                                                                    src={image.imgUrl} // Sử dụng đường dẫn đến ảnh từ mảng img
                                                                    alt={`Image ${index}`}
                                                                    className="hotelImg"
                                                                />
                                                            ))}
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    <span className="res-head">Ids</span>{item.title}
                                                </td>
                                                <td>
                                                    <span className="res-head">Ids</span>{item.bedCount}
                                                </td>
                                                <td>
                                                    <span className="res-head">Ids</span>{item.guestCount}
                                                </td>
                                                <td>
                                                    <span className="res-head">Ids</span>{item.bathroomCount}
                                                </td>
                                                <td>
                                                    <span className="res-head">Ids</span>{item.roomPrice}
                                                </td>
                                                <td>
                                                    <span className="res-head">Ids</span>{item.freewifi}
                                                </td>
                                                <td>
                                                    <span className="res-head">Ids</span>{item.roomService}
                                                </td>
                                                <td>
                                                    <span className="res-head">Ids</span>{item.TV}
                                                </td>
                                                <td>
                                                    <span className="res-head">Ids</span>{item.beachView}
                                                </td>
                                                <td>
                                                    <span className="res-head">Ids</span>{item.mountainView}
                                                </td>
                                                <td>
                                                    <span className="res-head">Ids</span>{item.cityView}
                                                </td>
                                                <td className='box-tool'>
                                                    <button className='item-tool' disabled>Edit</button>
                                                    <button className='item-tool' disabled>Remove</button>
                                                    <button onClick={() => {
                                                        setIdRoom(item.id)
                                                        setDisplay(true)
                                                        setSlideNumber(index);
                                                    }}>Details..</button>
                                                </td>
                                            </tr>


                                        );


                                    })
                                }
                            </tbody>
                        </table >
                    </>
                }

                <Modal className='box-modal-main'
                    visible={display} // Sử dụng prop visible thay vì show
                    onCancel={() => setDisplay(false)} // Sử dụng onCancel thay vì onHide
                    footer={[ // Sử dụng prop footer để tạo footer
                        <Button key="close" typeof="primary" onClick={() => setDisplay(false)}>
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
                                        <p><i className="fa-solid fa-bed"></i> {currentRoom?.bedCount} Bed</p>
                                    </div>
                                    <div>
                                        <p><i className="fa-solid fa-person"></i> {currentRoom?.guestCount} Guest </p>
                                    </div>
                                    <div>
                                        <p><i className="fa-solid fa-bath"></i> {currentRoom?.bathroomCount} Bathroom</p>
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

            </>
        </div >
    )
}

