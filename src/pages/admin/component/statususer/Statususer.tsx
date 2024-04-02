
import React, { useEffect, useState } from 'react'
import "./statususer.scss"
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../../../store';
import { api } from '../../../../service/apis';
import { Modal } from 'antd';
import { userAction } from '../../../../store/slices/user.slice';
export enum Partner {
    Yes = "Yes",
    No = "No",
}
enum StatusCitizen {
    inactive = "inactive",
    active = "active",
}
export default function Statususer() {
    const dispatch = useDispatch()
    const userStore = useSelector((store: StoreType) => store.userStore);
    console.log("userStore", userStore);
    const [selectedActive, setSelectedActive] = useState("active");
    const [selectedPartner, setSelectedPartner] = useState("No");
    const handleUpdatePartner = async (item: any, newStatus: string) => {
        try {
            const isParnert: Partner = newStatus as Partner; // Chuyển đổi từ string sang kiểu hotelStatus
            Modal.confirm({
                title: "Confirm",
                content: `Cập nhật trạng thái là ${isParnert}?`,
                onOk: async () => {
                    let res = await api.authen.update(item.id, { isParnert });
                    console.log("logreusltactive", res);
                    dispatch(userAction.updateUser(res.data.data));
                }
            });
        } catch (err: any) {
            console.log('Lỗi khi cập nhật trạng thái ', err);
        }
    };
    const handleUpdateCitizen = async (item: any, newStatus: string) => {
        try {
            const statusImg: StatusCitizen = newStatus as StatusCitizen; // Chuyển đổi từ string sang kiểu hotelStatus
            Modal.confirm({
                title: "Confirm",
                content: `Cập nhật trạng thái là ${statusImg}?`,
                onOk: async () => {
                    let res = await api.authen.update(item.id, { statusImg });
                    console.log("logreusltactive", res);
                    dispatch(userAction.updateUser(res.data.data));
                }
            });
        } catch (err: any) {
            console.log('Lỗi khi cập nhật trạng thái ', err);
        }
    };
    return (
        <div>
            <>
                <div>
                    <select value={selectedPartner} style={{ width: 120 }} onChange={(e) => setSelectedPartner(e.target.value)}>
                        <option value={Partner.Yes}>Partner</option>
                        <option value={Partner.No}>Client</option>

                    </select>
                </div>
                <h2>Manager User</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>avatar</th>
                            <th>userName</th>
                            <th>firstName</th>
                            <th>lastName</th>
                            <th>email</th>
                            <th>emailConfirm</th>
                            <th>isParnert</th>
                            <th>Ages</th>
                            <th>DayBirth</th>
                            <th>cccd</th>
                            <th>ImgCitizen</th>
                            <th>StatusCitizen</th>
                            <th>Phone</th>
                            <th>Tool</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userStore.list && Object.values(userStore.list)?.map((item, index) => {
                                if (item.isParnert == selectedPartner) {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <span className="res-head">Ids</span>BK-132024{item.id}
                                            </td>
                                            <td>
                                                <span className="res-head">Ids</span><img src={item.avatar} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                            </td>
                                            <td>
                                                <span className="res-head">Ids</span>{item.userName}
                                            </td>
                                            <td>
                                                <span className="res-head">Ids</span>{item.firstName}
                                            </td>
                                            <td>
                                                <span className="res-head">Ids</span>{item.lastName}
                                            </td>
                                            <td>
                                                <span className="res-head">Ids</span>{item.email}
                                            </td>
                                            <td>
                                                <span className="res-head">Ids</span>{item.emailConfirm}
                                            </td>
                                            <td>
                                                <div className="formInput">
                                                    <select id="featured " value={item.isParnert} onChange={(e) => { handleUpdatePartner(item, e.target.value) }}>
                                                        <option value={Partner.Yes}>{Partner.Yes}</option>
                                                        <option value={Partner.No}>{Partner.No}</option>

                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="res-head">userName</span>{item.gioitinh}
                                            </td>
                                            <td>
                                                <span className="res-head">email</span>{item.DayBrith}
                                            </td>
                                            <td>
                                                <span className="res-head">email</span>{item.cccd}
                                            </td>
                                            <td>
                                                <span className="res-head">Ids</span><img src={item.imgcitizen} style={{ width: "50px", height: "50px" }} />
                                            </td>
                                            <td>
                                                <div className="formInput">
                                                    <select disabled={item.statusImg == 'active'} id="featured " value={item.statusImg} onChange={(e) => { handleUpdateCitizen(item, e.target.value) }}>
                                                        <option value={StatusCitizen.active}>{StatusCitizen.active}</option>
                                                        <option value={StatusCitizen.inactive}>{StatusCitizen.inactive}</option>

                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="res-head">email</span>{item.Phone}
                                            </td>

                                            <td className="action">
                                                <button onClick={() => {
                                                    // handleupdateactive(item)
                                                }}>Active</button>
                                            </td>
                                        </tr>
                                    );
                                }


                            })
                        }
                    </tbody>
                </table >
            </>
        </div>
    )
}
