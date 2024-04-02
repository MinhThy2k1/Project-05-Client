import React, { useEffect, useState } from 'react'
import "./listhotel.scss"
import { api } from '../../service/apis';
import { StoreType } from "../../store";
import { hotelAction } from "../../store/slices/hotel.slice";
import { useSelector, useDispatch } from "react-redux";
import { randomUUID } from 'crypto';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
export default function Listhotel() {
    const userStore = useSelector((store: StoreType) => store.userStore)
    const hotelStore = useSelector((store: StoreType) => store.hotelStore)
    const dispatch = useDispatch()

    const [typeCounts, setTypeCounts] = useState([]);



    useEffect(() => {
        async function fetchHotelCounts() {
            try {
                const response = await axios.get('http://127.0.0.1:4000/api/v1/hotel/countByType');
                setTypeCounts(response.data);

            } catch (error) {
                console.error('Error fetching hotel counts:', error);
            }
        }

        fetchHotelCounts();
    }, []);
    const images = [
        "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
        "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    ];
    return (


        <>
            <div
                className='pList'>
                {
                    images.map((img, i) => (
                        <div className="pListItem" key={i}>
                            <img
                                src={img}
                                alt=""
                                className="pListImg"
                            />
                            <div className="pListTitles">
                                <h1>{typeCounts.length >= 3 ? typeCounts[i].type : 'No data'}</h1>
                                <h2>{typeCounts.length >= 3 ? typeCounts[i].count + " " + typeCounts[i].type : 'No data'}</h2>
                            </div>
                        </div>
                    ))
                }
            </div >
        </>
    )
}
