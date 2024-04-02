import React, { useEffect, useState } from 'react'
import "./activehotel.scss"
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../../store';
import { api } from '../../../service/apis';
import { message, Modal } from 'antd';
import { hotelAction } from '../../../store/slices/hotel.slice';
// import { AvailableStatus } from '../../../store/slices/hotel.slice';
export enum hotelStatus {
    Inactive = "inactive",
    Active = "active",
    Delete = "denied",
}
export default function ActiveHotel() {
    const [selectedActive, setSelectedActive] = useState("active")
    const [status, setStatus] = useState("")
    const userStore = useSelector((store: StoreType) => store.userStore)
    const hotelStore = useSelector((store: StoreType) => store.hotelStore)

    console.log("listhotel", hotelStore.list);

    const [list, setList] = useState();
    const dispatch = useDispatch();
    const handleupdateactive = async (item: any, newStatus: string) => {
        try {
            const status: hotelStatus = newStatus as hotelStatus; // Chuyển đổi từ string sang kiểu hotelStatus
            Modal.confirm({
                title: "Confirm",
                content: `Cập nhật trạng thái của khách sạn này là ${status}?`,
                onOk: async () => {
                    let res = await api.hotel.update(item.id, { status });
                    console.log("logreusltactive", res);
                    dispatch(hotelAction.updateStatus(res.data.data));
                    message.success(`Khách sạn có id ${item.id} của ${item.user.userName} đã được thay đổi`);
                }
            });
        } catch (err: any) {
            console.log('Lỗi khi cập nhật trạng thái ', err);
        }
    };
    useEffect(
        () => {

            console.log('userstore.data', hotelStore.list);

        }
        , [hotelStore])
    return (
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
                        <th>Address</th>
                        <th>Distance</th>
                        <th>City</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>UserPartner</th>
                        <th>EmailPar</th>
                        <th>Tool</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        hotelStore.getall && Object.values(hotelStore.getall)?.map((item, index) => {
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
                                            <div className="formInput">
                                                <select id="featured " value={item.status} onChange={(e) => { handleupdateactive(item, e.target.value) }}>
                                                    <option value={hotelStatus.Inactive}>{hotelStatus.Inactive}</option>
                                                    <option value={hotelStatus.Active}>{hotelStatus.Active}</option>
                                                    <option value={hotelStatus.Delete}>{hotelStatus.Delete}</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="res-head">userName</span>{item.user?.userName}
                                        </td>
                                        <td>
                                            <span className="res-head">email</span>{item.user?.email}
                                        </td>

                                        <td className="action">
                                            <button onClick={() => {
                                                // handleupdateactive(item)
                                            }}>Active</button>
                                            <button>Edit</button>
                                            <button>Delete</button>
                                        </td>
                                    </tr>
                                );
                            }

                        })
                    }
                </tbody>
            </table >
        </>

    )
}