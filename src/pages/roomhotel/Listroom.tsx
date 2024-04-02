import React from 'react'
import "./listroom.scss"
import { StoreType } from "../../store";
import { useSelector, useDispatch } from 'react-redux';
export default function ListRoom() {
    const hotelStore = useSelector((store: StoreType) => store.hotelStore)
    return (
        <div className='fp'>
            {
                hotelStore.getall && Object.values(hotelStore.getall)?.map((item, index) => (

                    <div onClick={(
                    ) => {
                        window.location.href = `/hotel/${item.id}`
                    }} className="fpItem" key={item.id}>
                        <img
                            src={item.image}
                            alt=""
                            className="fpImg"
                        />
                        <span className="fpName">{item.name}</span>
                        <span className="fpCity">{item.city}</span>
                        <span className="fpPrice">Type: {item.type}</span>
                    </div>
                ))
            }
        </div>
    )
}
